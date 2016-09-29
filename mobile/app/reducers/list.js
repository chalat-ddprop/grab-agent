const list = (state = [], action) => {
  switch (action.type) {
    case 'TRIGGER':
      return action.list;

    default:
      return state;
  }
}

export default list;
