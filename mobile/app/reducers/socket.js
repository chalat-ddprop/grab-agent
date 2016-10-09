const socket = (state = { io: null, connected: false }, action) => {
  switch (action.type) {
    case 'CONNECT':
      return { io: action.io, connected: true };

    case 'DISCONNECT':
      return { io: null, connected: false };

    default:
      return state;
  }
}

export default socket;
