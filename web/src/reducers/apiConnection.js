const apiConnection = (state = {saving: false, loading: false, xhr: null}, action) => {
  switch (action.type) {
    case 'SAVING':
      return Object.assign({}, state, {
        saving: true,
        xhr: action.xhr
      })

    case 'SAVED':
    case 'LOADED':
      return Object.assign({}, state, {
        saving: false,
        xhr: null
      })

    case 'LOADING':
      return Object.assign({}, state, {
        loading: true,
        xhr: action.xhr
      })

    default:
      return state;
  }
}

export default apiConnection
