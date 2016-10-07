export const updateCondition = (key, value) => {
  return {
    type: 'UPDATE_CONDITION',
    key: key,
    value: value,
  }
}

export const updateUserProfile = (key, value) => {
  return {
    type: 'UPDATE_USER_PROFILE',
    key: key,
    value: value,
  }
}

export const createEnquiry = (userProfile, conditions) => {
  return (dispatch, getState, { enquiryService }) => {
    let { apiConnection } = getState();

    if (apiConnection.xhr) {
      apiConnection.xhr.abort();
    }

    let xhr = enquiryService.createEnquiry(userProfile, conditions)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({
          type: 'SAVED'
        });

        dispatch(addEnquiry(json, conditions));
      })

    return {
      type: 'SAVING',
      xhr: xhr
    }
  }
}

export const addEnquiry = (payload, conditions) => {
  return {
    type: 'ADD_ENQUIRY',
    key: payload.key,
    timestamp: payload.timestamp,
    conditions: conditions,
  }
}

export const saving = (xhr) => {
  return {
    type: 'SAVING',
    xhr: xhr,
  }
}

export const loading  = (xhr) => {
  return {
    type: 'LOADING',
    xhr: xhr,
  }
}

export const saved = () => {
  return {
    type: 'SAVED'
  }
}

export const loaded = () => {
  return {
    type: 'LOADED'
  }
}
