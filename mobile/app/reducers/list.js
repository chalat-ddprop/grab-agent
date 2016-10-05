const list = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH':
      return action.list;

    default:
      return state;
  }
}

export default list;
