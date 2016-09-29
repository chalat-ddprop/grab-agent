const validateUserid = (userid) => {
  return userid && /[^@]+@[\s\d]+\.(?:[a-z]+){1,}/.test(userid)
}

const validateMandatoryFields = (userProfile) {
  return validateUserid(userProfile.userid) && userProfile.firstname && userProfile.lastname && userProfile.mobile
}
