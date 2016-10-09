let mockAgents = [
  {
    agentId: 101,
    firstname: 'Andrei',
    lastname: 'Blotzu',
    imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/422665_2777709124390_659706876_n.jpg?oh=8420581225b63f4c99569c7c471478ba&oe=58A1B1B1',
    status: 'TYPING',
  },
  {
    agentId: 102,
    firstname: 'Chalat',
    lastname: 'Luprasit',
    imageUrl: 'http://graph.facebook.com/694642202/picture/320',
    status: 'RESPONSED',
    message: "Hi! I have 5 properties you would interested.\nI can go along with you on Saturday anytime before 9pm\nLooking forward to get your response."
  },
  {
    agentId: 103,
    firstname: 'Chatchai',
    lastname: 'Kritsetsakul',
    imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/12243281_10153676501877698_9056860850198762974_n.jpg?oh=47bd710287c476227bd46fcb4b5f5d52&oe=586480FD',
    status: 'REQUESTING',
  },
]

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
  agents: mockAgents,
  status: null,
}

const enquiry = (state = initialData, action) => {
  switch (action.type) {
    case 'UPDATE_ENQUIRY':
      return Object.assign({}, state, {
          key: action.key,
          ...action.enquiryData
        })

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
