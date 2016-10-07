import _ from 'lodash';

const enquiries = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ENQUIRY':
      return [
        ...state,
        {
          key: action.key,
          conditions: action.conditions,
        }
      ]

    case 'REMOVE_ENQUIRY':
      return _.filter(state, (enquiry) => {
        return action.key !== enquiry.key;
      });

    default:
      return state;
  }
}

export default enquiries;
