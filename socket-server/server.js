var express = require("express");
var app = express();
var port = 3700;

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


var mappingTable = {};

function getKey(data) {
  return data.key;
}

io.sockets.on('connection', function (socket) {
  socket.on('create_enquiry', function(data) {
    mappingTable[getKey(data)] = socket;
    io.sockets.emit('consumer_enquiry', data);
    console.log('all sockets emit consumer_enquiry');
  });

  socket.on('typing', function(data) {
    var sock = mappingTable[getKey(data)];
    sock.emit('agent_typing', data);
    console.log('mapped socket emit agent_typing');
  });

  socket.on('response', function(data) {
    var sock = mappingTable[getKey(data)];
    sock.emit('agent_response', data);
    console.log('mapped socket emit agent_response');
  });

  socket.on('cancel', function(data) {
    var sock = mappingTable[getKey(data)];
    sock.emit('agent_cancel', data);
    console.log('mapped socket emit agent_cancel');
  });

  socket.on('accept', function(data) {
    var sock = mappingTable[getKey(data)];
    sock.emit('agent_deal', data);
    console.log('mapped socket emit agent_deal');

    io.sockets.emit('consumer_deal', data);
    console.log('all sockets emit consumer_deal');
  });
});
