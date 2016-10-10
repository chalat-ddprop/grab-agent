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
  agentProfile: null,
  status: null,
}

const enquiry = (state = initialData, action) => {
  switch (action.type) {
    case 'UPDATE_ENQUIRY':
      return Object.assign({}, state, {
          key: action.key,
          ...action.enquiryData
        })

    case 'AGENTS_NOTIFY':
      return Object.assign({}, state, {
        agents: action.agents.map((agent) => {
          return {
            ...agent,
            status: 'REQUESTING',
          }
        })
      })

    case 'AGENT_TYPING':
      if (state.key !== action.enquiryKey) {
        return state;
      }

      return Object.assign({}, state, {
        agents: state.agents.map((agent) => {
          if (agent.agentId === action.agentId) {
            return {
              ...agent,
              status: 'TYPING',
            }
          }

          return agent;
        })
      })

    case 'AGENT_RESPONSE':
      if (state.key !== action.enquiryKey) {
        return state;
      }

      return Object.assign({}, state, {
        agents: state.agents.map((agent) => {
          if (agent.agentId === action.agentId) {
            return {
              ...agent,
              status: 'RESPONSED',
              message: action.message,
            }
          }

          return agent
        })
      })

    case 'AGENT_DEAL':
      return Object.assign({}, state, {
        agentInfo: {
          ...action.agentProfile,
          message: state.agents.filter((agent) => {
            return agent.agentId == action.agentProfile.agentId;
          })[0].message
        },
        status: 'CLOSE'
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

    case 'UPDATE_ENQUIRY_STATUS':
      return Object.assign({}, state, {
        status: action.status,
      })

    default:
      return state
  }
}

export default enquiry;
