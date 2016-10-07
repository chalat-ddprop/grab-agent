let initialData = {
  page: 'home',
  id: '',
}

const route = (state = initialData, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        page: action.page,
        id: action.id || state.id
      }

    default:
      return state
  }
}

export default route
