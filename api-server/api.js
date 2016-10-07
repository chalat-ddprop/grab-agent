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

// init cmongodb
var MongoClient = require('mongodb').MongoClient
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

router.get('/create-enquiry', function(req, res) {
    dbConnection
        .collection(mongoCollectionName)
        .insertOne({
            'timestamp' : new Date()
        }, (err, result) => {
            let doc = result.ops[0];
            let payload = {
                'key' : doc._id
                'timestamp' : doc.timestamp
            };

            socket.emit('create_enquiry', payload);

            res.json({ enquiryKey: payload.key, enquiryData: payload, status: 0 });
        })
    ;
});

router.get('/get-enquiry', function(req, res) {
	res.json(db[req.query.key]);
});

router.get('/get-enquiries', function(req, res) {
	res.json(db);
});

router.post('/agent_typing', function(req, res) {
	socket.emit('typing', req.body);
	res.json();
})

router.post('/agent_response', function(req, res) {
	db[req.body.key].enquiryData = req.body;
	socket.emit('response', req.body);
	res.json();
})

router.post('/agent_cancel', function(req, res) {
	delete db[req.body.key];
	socket.emit('cancel', req.body);
	res.json();
})

app.use('/api', router);
app.listen(apiPort);

console.log('Listening on port ' + apiPort);
