const initialData = {
  key: null,
  condition: {
    listingType: null,
    propertyType: null,
    lat: null,
    lng: null,
    radius: 1000, // 1 km
    bedroom: null,
    bathroom: null,
    floorSizeMin: null,
    floorSizeMax: null,
    furnishing: null,
    message: '',
  },
  agents: [],
  status: null,
}

const enquiry = (state = initialData, action) => {
  switch (action.type) {
    case 'UPDATE_ENQUIRY':
      return Object.assign({}, state, {
          key: action.key,
          ...action.enquiryData
        })

    case 'CLEAR_ENQUIRY':
      return Object.assign({}, initialData)

    case 'PICK_AGENT':
      return Object.assign({}, state, {
        agents: state.agents.filter((agent) => {
          return agent.agentId === action.agentId
        }),
        status: 'ACCEPT'
      })

    case 'REMOVE_AGENT':
      return Object.assign({}, state, {
        agents: state.agents.filter((agent) => {
          return agent.agentId !== action.agentId
        })
      })

    default:
      return state
  }
}

export default enquiry;
