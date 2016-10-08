let initialData = {
  page: 'home',
  id: '',
  state: null,
}

const route = (state = initialData, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        page: action.page,
        id: action.id || state.id,
        state: null,
      }

    case 'CHANGE_STATE':
      return Object.assign({}, state, {
        state: action.state
      });

    default:
      return state
  }
}

export default route
