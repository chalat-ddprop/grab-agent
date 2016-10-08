'use strict';

var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

var apiPort = 4300,
		socketPort = 3700;

// init socket.io connection
var socket = require('socket.io-client')('http://localhost:' + socketPort);
socket.on('connect', function() {
	console.log("Socket server connected on " + socketPort);
});
socket.on('disconnect', function() {
	console.log("Socket server disconnected on " + socketPort);
});

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

// init cmongodb
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

// init express
var app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: "Server is up and running" });
});

router.post('/create-enquiry', function(req, res) {
    let enquiryData = {
        'conditions': req.body.conditions,
        'userProfile': req.body.userProfile,
        'agents': mockAgents,
        'status': "OPEN",
        'timestamp' : new Date()
    };

    dbConnection
        .collection(mongoCollectionName)
        .insertOne(enquiryData, (err, result) => {
            let doc = result.ops[0];
            let payload = {
                'key' : doc._id,
                'timestamp' : doc.timestamp
            };

            socket.emit('create_enquiry', payload);
            console.log('Created Enquiry: ' + payload.key);
            console.log(enquiryData);

            res.json({ enquiryKey: payload.key, enquiryData: enquiryData, status: 0 });
        })
    ;
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

app.use('/api', router);
app.listen(apiPort);

console.log('Listening on port ' + apiPort);
