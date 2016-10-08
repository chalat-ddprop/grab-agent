const initialState = {
  listingType: 'SALE',
  propertyType: 'CONDO',
  lat: 13.7404247,
  lng: 100.5612685,
  radius: 1000, // 1 km
  bedroom: null,
  bathroom: null,
  floorSizeMin: null,
  floorSizeMax: null,
  furnishing: null,
  message: '',
}

const conditions = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CONDITION':
      return Object.assign({}, state, {
        [action.key]: action.value
      });

    case 'UPDATE_CONDITION_POSITION':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
      });

    default:
      return state
  }
}

export default conditions
