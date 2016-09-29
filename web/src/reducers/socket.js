const socket = (state = {connected: null, showPopup: false}, action) => {
  switch (action.type) {
    case 'CONNECT':
      return {
        connected: true,
        showPopup: state.connected === false
      }

    case 'DISCONNECT':
      return {
        connected: false,
        showPopup: false
      }

    case 'CLOSE_POPUP':
      return {
        connected: state.connected,
        showPopup: false
      }

    default:
      return state
  }
}

export default socket
