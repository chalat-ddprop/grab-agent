const validateUserid = (userid) => {
  return userid && /^[^@]+@[\w]+(?:\.[\w]+)+$/.test(userid)
}

const validateMandatoryFields = (userProfile) => {
  return !!(validateUserid(userProfile.userid) && userProfile.firstname && userProfile.lastname && userProfile.mobile)
}

module.exports = {
  validateUserid,
  validateMandatoryFields
}
