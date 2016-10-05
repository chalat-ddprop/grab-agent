const agentResponse = (state = { message: '' }, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return Object.assign({}, state, { message: action.text });

    default:
      return state;
  }
}

export default agentResponse;
