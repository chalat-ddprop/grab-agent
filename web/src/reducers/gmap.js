const initialData = {
  google: null,
  center: {
    lat: null,
    lng: null,
  }
}

const gmap = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_GMAP':
      return {
        google: action.google,
        center: state.center
      }

    case 'SET_MAP_CENTER':
      return {
        google: state.google,
        center: action.center,
      }

    default:
      return state;
  }
}

export default gmap;
