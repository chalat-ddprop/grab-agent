const socket = (state = { connected: false }, action) => {
  switch (action.type) {
    case 'CONNECT':
      return { connected: true };

    case 'DISCONNECT':
      return { connected: false };

    default:
      return state;
  }
}

export default socket;
