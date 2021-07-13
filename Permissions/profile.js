const Config = require('../config.js');

function canViewProfile(user, dataId) {  
    return (
      user.role === Config.ROLE.ADMIN ||
      dataId === user.id
    )
  }

  function canEditProfile(user, data) {   
    return (
      user.role === Config.ROLE.ADMIN ||
      data === user.id
    )
  }

  function scopedData(user, data) {
    if (user.role === Config.ROLE.ADMIN) return data
    return data.find(data => data.Id === user.id)
  
  }
  
  function canDeleteProfile(user, project) {
    return project.userId === user.id
  }
  
  module.exports = {
    canViewProfile,
    scopedData,
    canDeleteProfile,
    canEditProfile
  }