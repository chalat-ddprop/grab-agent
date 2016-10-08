import _ from 'lodash';

const enquiries = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ENQUIRY':
      return [
        ...state,
        {
          key: action.key,
          userProfile: state.userProfile,
          ...action.enquiryData
        }
      ]

    case 'UPDATE_ENQUIRY':
      return _.map(state, (enquiry) => {
        if (action.key === enquiry.key) {
          return {
            key: enquiry.key,
            userProfile: state.userProfile,
            ...action.enquiryData
          }
        }

        return enquiry
      })

    case 'REMOVE_ENQUIRY':
      return _.filter(state, (enquiry) => {
        return action.key !== enquiry.key;
      });

    default:
      return state;
  }
}

export default enquiries;
