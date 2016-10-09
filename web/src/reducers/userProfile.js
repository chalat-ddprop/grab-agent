const initialData = {
  clientId: '',
  userid: '',
  firstname: '',
  lastname: '',
  mobile: '',
  imageUrl: 'http://graph.facebook.com/694642202/picture/320'
}

const userProfile = (state = initialData, action) => {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      return Object.assign({}, state, {
        [action.key]: action.value
      })

    case 'CLEAR_USER_PROFILE':
      return initialData

    case 'CLIENT_MAPPED':
      return Object.assign({}, state, {
        clientId: action.clientId
      });

    default:
      return state
  }
}

export default userProfile
