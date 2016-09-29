const socket = (state = { connected: false }, action) => {
  switch (action.type) {
    case 'CONNECT':
      return { connected: true };

    case 'DISCONNECT':
    default:
      return { connected: false };
  }
}

export default socket;
