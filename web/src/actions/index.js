export const updateCondition = (key, value) => {
  return {
    type: 'UPDATE_CONDITION',
    key: key,
    value: value,
  }
}

export const updateConditionPosition = (lat, lng) => {
  return {
    type: 'UPDATE_CONDITION_POSITION',
    lat: lat,
    lng: lng,
  }
}

export const updateMapCenter = (lat, lng) => {
  return {
    type: 'SET_MAP_CENTER',
    center: {
      lat: lat,
      lng: lng,
    },
  }
}

export const updateUserProfile = (key, value) => {
  return {
    type: 'UPDATE_USER_PROFILE',
    key: key,
    value: value,
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

export const changeState = (state) => {
  return {
    type: 'CHANGE_STATE',
    state: state,
  }
}

export const addEnquiry = (enquiryKey, enquiryData) => {
  return {
    type: 'ADD_ENQUIRY',
    key: enquiryKey,
    enquiryData: enquiryData,
  }
}

export const updateEnquiry = (enquiryKey, enquiryData) => {
  return {
    type: 'UPDATE_ENQUIRY',
    key: enquiryKey,
    enquiryData: enquiryData,
  }
}

export const clearEnquiry = () => {
  return {
    type: 'CLEAR_ENQUIRY',
  }
}

export const pickAgent = (agentId) => {
  return {
    type: 'PICK_AGENT',
    agentId: agentId,
  }
}

export const removeAgent = (agentId) => {
  return {
    type: 'REMOVE_AGENT',
    agentId: agentId,
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
        dispatch(saved());
        // dispatch(addEnquiry(json.enquiryKey, json.enquiryData));
        dispatch(updateEnquiry(json.enquiryKey, json.enquiryData));
      })

    return saving(xhr)
  }
}

export const getEnquiry = (enquiryKey) => {
  return (dispatch, getState, { enquiryService }) => {
    let { apiConnection } = getState();

    if (apiConnection.xhr) {
      apiConnection.xhr.abort();
    }

    let xhr = enquiryService.getEnquiry(enquiryKey)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let enquiry = json[0];
        dispatch(loaded());
        dispatch(updateEnquiry(enquiry.key, enquiry))
      })

    return loading(xhr)
  }
}

export const cancelEnquiry = (enquiryKey) => {
  return (dispatch, getState, { enquiryService }) => {
    dispatch(clearEnquiry())

    let { apiConnection } = getState();

    if (apiConnection.xhr) {
      apiConnection.xhr.abort();
    }

    let xhr = enquiryService.cancelEnquiry(enquiryKey)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(saved());
      })

    return saving(xhr)
  }
}

export const acceptAgent = (enquiryKey, agentId) => {
  return (dispatch, getState, { enquiryService }) => {
    dispatch(pickAgent(agentId));

    let { apiConnection } = getState();

    if (apiConnection.xhr) {
      apiConnection.xhr.abort();
    }

    let xhr = enquiryService.acceptAgent(enquiryKey)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let enquiry = json[0];
        dispatch(saved());
        dispatch(updateEnquiry(enquiry.key, enquiry))
      })

    return saving(xhr)
  }
}

export const denyAgent = (enquiryKey, agentId) => {
  return (dispatch, getState, { enquiryService }) => {
    dispatch(removeAgent(agentId));

    let { apiConnection } = getState();

    if (apiConnection.xhr) {
      apiConnection.xhr.abort();
    }

    let xhr = enquiryService.denyAgent(enquiryKey)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let enquiry = json[0];
        dispatch(saved());
        dispatch(updateEnquiry(enquiry.key, enquiry))
      })

    return saving(xhr)
  }
}
