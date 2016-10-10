'use strict';

let imports = {
    'SDKHttpClient' : require('./lib/SDKHttpClient.class.js'),
};

var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

var apiPort = 4300,
    socketPort = 3700;
let apiAccessToken = process.env['PG_ACCESS_TOKEN'] || '';

let consumerSockets = {};
let allSockets = {};
let agentSockets = {};
let agentProfiles = {};
let region = 'sg';

let mockAgents = [
  {
    agentId: 101,
    firstname: 'Andrei',
    lastname: 'Blotzu',
    imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/422665_2777709124390_659706876_n.jpg?oh=8420581225b63f4c99569c7c471478ba&oe=58A1B1B1',
    status: 'TYPING',
  },
  {
    agentId: 102,
    firstname: 'Chalat',
    lastname: 'Luprasit',
    imageUrl: 'http://graph.facebook.com/694642202/picture/320',
    status: 'RESPONSED',
    message: "Hi! I have 5 properties you would interested.\nI can go along with you on Saturday anytime before 9pm\nLooking forward to get your response."
  },
  {
    agentId: 103,
    firstname: 'Chatchai',
    lastname: 'Kritsetsakul',
    imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/12243281_10153676501877698_9056860850198762974_n.jpg?oh=47bd710287c476227bd46fcb4b5f5d52&oe=586480FD',
    status: 'TYPING',
  },
]

// init mongodb
var MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , assert = require('assert');

// Connection URL
let mongoDbName = 'grab';
let mongoCollectionName = 'enquiries';
let mongoUrl = `mongodb://localhost:27017/${mongoDbName}`;
let dbConnection = null;
// Use connect method to connect to the Server
MongoClient.connect(mongoUrl, function(err, db) {
    if (err) {
        throw new Error(`Could not connect to mongodb ${mongoUrl}`);
    }
    console.log("Mongodb connection ready");
    dbConnection = db;
});

// init sdks
let listingSdk = new imports.SDKHttpClient({
    "scheme" : "https",
    "host" : "api.propertyguru.com",
});
let agentSdk = new imports.SDKHttpClient({
    "scheme" : "https",
    "host" : "api.propertyguru.com",
});

// init express
var app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: "Server is up and running" });
});

router.use('/create-enquiry', function(req, res) {
    let enquiryData = {
        'conditions': req.body.conditions,
        'userProfile': req.body.userProfile,
        'agents': mockAgents,
        'status': "OPEN",
        'timestamp' : new Date()
    };
    console.log(req.body);

    console.log("Received client enquiry");
    console.log(enquiryData);

    dbConnection
        .collection(mongoCollectionName)
        .insertOne(enquiryData, (err, result) => {
            let doc = result.ops[0];
            let payload = {
                'key' : doc._id,
                'timestamp' : doc.timestamp
            };
            // notify agents - if any
            let socketAgentIds = Object.keys(agentSockets);
            let agentIds = [];

            if (socketAgentIds.length > 0) {
                console.log(`Enquiry ${payload.key}: Filtering based on user filters and logged in agent ids (${socketAgentIds.length})`);
                let filters = {
                    'listing_type' : (req.body.conditions.listingType || '').toLowerCase(),
                    'property_type_code' : (req.body.conditions.propertyType || '').toUpperCase(),
                    'center_lat' : parseFloat(req.body.conditions.lat) || 0,
                    'center_long' : parseFloat(req.body.conditions.lng) || 0,
                    'distance' : parseFloat(req.body.conditions.radius) || 0,

                    'access_token' : apiAccessToken,
                    'region' : region,
                    'status_code' : 'ACT',
                    'agent_id' : socketAgentIds,
                    'limit' : 100,
                };

                let floorSizeMin = parseFloat(req.body.conditions.floorSizeMin) || -1;
                if (floorSizeMin >= 0 ) {
                    filters['minsize'] = floorSizeMin;
                }

                let floorSizeMax = parseFloat(req.body.conditions.floorSizeMax) || -1;
                if (floorSizeMax >= 0 ) {
                    filters['maxsize'] = floorSizeMax;
                }

                let beds = parseInt(req.body.conditions.bedroom);
                if (!isNaN(beds)) {
                    filters['beds'] = beds;
                }

                let baths = parseInt(req.body.conditions.bathroom);
                if (!isNaN(baths)) {
                    filters['baths'] = baths;
                }

                let furnishing = req.body.conditions.furnishing || '';
                if (furnishing != '') {
                    filters['furnishing'] = furnishing;
                }

                listingSdk.request('/v1/listings', filters, (err, response) => {
                    if (err) {
                        console.log(err);
                        throw new Error('noooooooo');
                    }

                    let listings = response.listings || [];
                    console.log(`Enquiry ${payload.key}: Got ${listings.length} listings from user request`);
                    for (let listing of listings) {
                        let agentId = listing['agent'] ? listing['agent']['id'] : null;
                        if (agentId) {
                            agentIds[agentId] = 1
                        }
                    }
                    agentIds = Object.keys(agentIds);

                    // send the response to the client
                    res.json({ enquiryKey: payload.key, enquiryData: payload, status: 0 });

                    if (agentIds.length > 0) {
                        console.log(`Enquiry ${payload.key}: Notifying ${agentIds.length} agents`);
                        console.log(agentIds);

                        for (let agentId of agentIds) {
                            console.log(`Enquiry ${payload.key}: Notifying agent ${agentId}`);
                            agentSockets[agentId].emit('consumer_enquiry', {
                                'userProfile': req.body.userProfile,
                                'key' : doc._id,
                                'timestamp' : doc.timestamp,
                            });
                        }
                    } else {
                        console.log(`Enquiry ${payload.key}: No listings found for specified filters and agents`);
                    }

                    // get the agent details
                    agentSdk.request('/v3/agent', {
                        'agent_id' : agentIds,
                        'access_token' : apiAccessToken,
                        'region' : region,
                        'locale' : 'en',
                    }, (err, response) => {
                        if (err) {
                            console.log(err);
                            throw new Error('noooooooo');
                        }

                        let agents = response.records || [];
                        let agentInfo = [];
                        for (let agent of agents) {
                            let agentProfile = {
                                'agentId' : agent['id'],
                                'firstname' : agent['webUser']['person']['firstname'],
                                'lastname' : agent['webUser']['person']['lastname'],
                                'imageUrl' : agent['photo'][0]
                                    ||  agent['logo'][0]
                                    ||  (agent['agency'] ? agent['agency']['photo'][0] : null)
                                    ||  (agent['agency'] ? agent['agency']['lgoo'][0] : null),
                            }

                            agentProfiles[agent['id']] = agentProfile;
                            agentInfo.push(agentProfile);
                        }

                        console.log(`Enquiry ${payload.key}: Sending notified agents`);
                        console.log(agentInfo);

                        // notify the client
                        allSockets[req.body.clientId].emit('agents_notify', {
                            'enquiryKey': payload.key,
                            'agents' : agentInfo
                        });

                        consumerSockets[payload.key] = allSockets[req.body.clientId];

                        console.log(`Enquiry ${payload.key}: Client notified`);
                    });
                });
            } else {
                console.log(`Enquiry ${payload.key}: No logged in agents`);
                res.json({ enquiryKey: payload.key, enquiryData: payload, agentIds: agentIds, status: 0 });
            }
        });
});

router.post('/get-enquiry', function(req, res) {
  let enquiry = dbConnection.collection(mongoCollectionName).find({_id: ObjectID(req.body.key)}, (err, result) => {
    result.toArray((err, arr) => {
      console.log(arr);
      res.json(arr);
    })
  });
});

router.post('/get-enquiries', function(req, res) {
    res.json(dbConnection);
});

router.post('/agent-typing', function(req, res) {
	socket.emit('typing', req.body);
	res.json();
})

router.post('/agent-response', function(req, res) {
	dbConnection[req.body.key].enquiryData = req.body;
	socket.emit('response', req.body);
	res.json();
})

router.post('/agent-cancel', function(req, res) {
	delete dbConnection[req.body.key];
	socket.emit('cancel', req.body);
	res.json();
})

router.post('/consumer-accept', function(req, res) {
  let enquiryKey = req.body.key,
      agentId = req.body.agentId;

  dbConnection.collection(mongoCollectionName).find({_id: ObjectID(enquiryKey)}, (err, result) => {
    result.toArray((err, arr) => {
      if (arr.length) {
        let enquiry = arr[0],
          data = {
            enquiryKey: enquiryKey,
            userProfile: enquiry.userProfile,
            conditions: enquiry.conditions,
            agentProfile: agentProfiles[agentId]
          },
          consumerSoc = consumerSockets[enquiryKey],
          agentSoc = agentSockets[agentId];

        consumerSoc.emit('agent_deal', data);
        agentSoc.emit('consumer_deal', data);
      }
    })
  });

	res.json();
})

router.post('/consumer-deny', function(req, res) {
	res.json();
})

router.post('/cancel-enquiry', function(req, res) {
    res.json();
})

app.use('/api', router);
app.listen(apiPort);

console.log('App listening on port ' + apiPort);

// socket.io
let socketApp = express();
var io = require('socket.io').listen(socketApp.listen(socketPort));
console.log('Socket.io listening on port ' + socketPort);

io.sockets.on('connection', function (socket) {
    console.log("Client socket connected " + socket.id);

    allSockets[socket.id] = socket;
    socket.emit('client_mapped', socket.id);
    socket.on('disconnect', function() {
        delete allSockets[this.id];
    });

    /**
     * Consumer events
     */
    socket.on('create_enquiry', function(enquiryData) {
        consumerSockets[enquiryData.enquiry.key] = socket;
        console.log(consumerSockets);
        io.sockets.emit('consumer_enquiry', enquiryData);
        console.log('all sockets emit consumer_enquiry');
    });
    socket.on('accept', function(data) {
        var sock = agentSockets[data.agentId];
        sock.emit('agent_deal', data.enquiryData);
        console.log('mapped socket emit agent_deal');

        io.sockets.emit('consumer_deal', data.enquiryData);
        console.log('all sockets emit consumer_deal');
    });

    /**
     * Agent events
     */
    socket.on('typing', function(data) {
        var sock = consumerSockets[data.enquiryKey];
        sock.emit('agent_typing', {
            'enquiryKey' : data.enquiryKey,
            'agentId' : data.agentId
        });
        console.log('mapped socket emit agent_typing');
    });
    socket.on('response', function(data) {
        var sock = consumerSockets[data.enquiryKey];
        sock.emit('agent_response', {
            'enquiryKey' : data.enquiryKey,
            'agentId' : data.agentId,
            'message' : data.message
        });
        console.log('mapped socket emit agent_response');
    });
    socket.on('login', function(data) {
        agentSockets[data.agentId] = socket;
        console.log('login');
    });

/*
    socket.on('cancel', function(data) {
        var sock = mappingTable[getKey(data)];
        sock.emit('agent_cancel', data);
        console.log('mapped socket emit agent_cancel');
    });
*/
});
