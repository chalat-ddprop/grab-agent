const initialState = {
  listingType: 'SALE',
  propertyType: 'CONDO',
  lat: 1.3181772,
  lng: 103.8407591,
  radius: 10000, // 1 km
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
