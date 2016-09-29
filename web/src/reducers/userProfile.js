const initialData = {
  userid: '',
  firstname: '',
  lastname: '',
  mobile: '',
}

const userProfile = (state = initialData, action) => {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      return Object.assign({}, state, {
        [action.key]: action.value
      })

    case 'CLEAR_USER_PROFILE':
      return initialData

    default:
      return state
  }
}

export default userProfile
