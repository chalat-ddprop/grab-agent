const agentProfile = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.profile;

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
}

export default agentProfile;
