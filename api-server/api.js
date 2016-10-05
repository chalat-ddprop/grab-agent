var crypto = require('crypto'),
		express = require('express'),
		cors = require('cors'),
		bodyParser = require('body-parser');

var apiPort = 4300,
		socketPort = 3700;

var socket = require('socket.io-client')('http://localhost:' + socketPort);
socket.on('connect', function() {
	console.log("Socket server connected on " + socketPort);
});
socket.on('disconnect', function() {
	console.log("Socket server disconnected on " + socketPort);
});

var app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: "Server is up and running" });
});

router.post('/create-enquiry', function(req, res) {
	var key = randomValueHex(32);
	req.body.key = key;
	req.body.timestamp = new Date();
	db[key] = req.body;

	socket.emit('create_enquiry', req.body);

	res.json({ enquiryKey: key, enquiryData: req.body, status: 0 });
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

//----------------------------------------------------------------------------//

var db = {};  // { enquiryKey: {enquiryData}, ... }

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}
