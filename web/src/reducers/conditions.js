const initialState = {
  listingType: 'SALE',
  propertyType: 'CONDO',
  lat: null,
  lng: null,
  bedroom: null,
  bathroom: null,
  sizeMin: null,
  sizeMax: null,
  furnishing: null,
}

const conditions = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CONDITION':
      return Object.assign({}, state, {
        [action.key]: action.value
      })

    default:
      return state
  }
}

export default conditions
