import io from 'socket.io-client/socket.io';

class AgentSocketService {
  constructor(scheme, host, port = 8080) {
    this.scheme = scheme;
    this.host = host;
    this.port = port;

    this.socket = null;
  }

  connect(connectCb, disconnectCb) {
    this.socket = io(`${this.scheme}://${this.host}:${this.port}`, {jsonp: false});

    socket.on('connect', connectCb);
    socket.on('disconnect', disconnectCb);
  }

  onAgentRequest(cb) {
    this.socket.on('agent-request', cb);
  }

  onAgentResponse(cb) {
    this.socket.on('agent-response', cb);
  }

  requestAgent(data, cb) {
    this.socket.emit('agent-request', data, cb);
  }

  agentResponse(data, cb) {
    this.socket.emit('agent-response', data, cb);
  }
}

export default Socket;
