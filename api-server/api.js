var crypto = require('crypto'),
		express = require('express'),
		cors = require('cors'),
		bodyParser = require('body-parser');

var port = 4300;

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
	req.body.timestamp = new Date();
	db[key] = req.body;
	res.json({ enquiryKey: key, enquiryData: req.body, status: 0 });
});

router.get('/get-enquiry', function(req, res) {
	res.json(db[req.query.key]);
});

router.get('/get-enquiries', function(req, res) {
	res.json(db);
});

app.use('/api', router);
app.listen(port);

console.log('Listening on port ' + port);

//----------------------------------------------------------------------------//

var db = {};  // { enquiryKey: {enquiryData}, ... }

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}
