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
