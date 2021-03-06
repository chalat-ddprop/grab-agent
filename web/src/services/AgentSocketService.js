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

    this.socket.on('connect', connectCb);
    this.socket.on('disconnect', disconnectCb);
  }

  onClientMapped(cb) {
    this.socket.on('client_mapped', cb);
  }

  onAgentsNotify(cb) {
    this.socket.on('agents_notify', cb);
  }

  onAgentTyping(cb) {
    this.socket.on('agent_typing', cb);
  }

  onAgentResponse(cb) {
    this.socket.on('agent_response', cb);
  }

  onAgentDeal(cb) {
    this.socket.on('agent_deal', cb);
  }
}

export default AgentSocketService;
