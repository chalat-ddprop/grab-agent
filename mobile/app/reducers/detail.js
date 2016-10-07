const detail = (state = { item: null }, action) => {
  switch (action.type) {
    case 'SET':
      return { item: action.item };
    case 'RESET':
      return { item: null };
    default:
      return state;
  }
}

export default detail;
