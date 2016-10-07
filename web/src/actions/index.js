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
    key,
    value
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
        })
      })

    return {
      type: 'SAVING',
      xhr: xhr
    }
  }
}
