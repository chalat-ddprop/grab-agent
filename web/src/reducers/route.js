const route = (state, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        page: action.page,
        id: action.id || state.id
      }

    default:
      return {
        page: 'home',
        id: ''
      }
  }
}

export default route
