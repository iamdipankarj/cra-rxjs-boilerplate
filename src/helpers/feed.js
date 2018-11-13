export const getContentType = (contentType) => {
  switch (contentType) {
    case 'IMAGE': {
      return 'image'
    }
    case 'SLIDESHOW': {
      return 'slideShow'
    }
    case 'QUESTION': {
      return 'question'
    }
    case 'VIDEO': {
      return 'video'
    }
    case 'AUDIO': {
      return 'audio'
    }
    case 'GIF': {
      return 'gif'
    }
    default: {
      return null
    }
  }
}

export const getUserDetails = (id, userViews) => {
  const userData = userViews.find(user => user.userId === id)
  if (userData) {
    return userData
  }
  return {
    'babyAgeInDays': 0,
    'bio': {
      'value': ''
    },
    'firstName': '',
    'fullName': '',
    'isAnonymous': false,
    'language': '',
    'lastName': '',
    'profilePicUrl': '',
    'userId': ''
  }
}

export const getChannelDetails = (channelId, channelViews, userViews) => {
  const iterableViews = channelViews !== undefined ? channelViews : userViews
  const channelData = iterableViews.find(channel => channel.channelId === channelId)
  if (channelData) {
    return channelData
  }
  return {
    'bio': {
      'value': ''
    },
    'channelId': '',
    'name': '',
    'profilePicUrl': ''
  }
}
