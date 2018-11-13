import request from './request'

const API_BASE = 'https://api-endpoint.appspot.com/_ah/api/web/v1'

export const fetchFeedContent = ({ contentType, id }) => {
  const url = `${API_BASE}/getContentFull?contentType=${contentType}&id=${id}&verificationId=${process.env.REACT_APP_VERIFICATION_ID}`
  return request({
    method: 'get',
    url
  })
}

export const fetchContentDetails = ({ contentType, id }) => {
  const url = `${API_BASE}/content?contentType=${contentType}&id=${id}&isPinned=false`
  return request({
    method: 'get',
    url
  })
}

export const postFeedComment = ({ commentText, contentType, id, userId }) => {
  const url = `${API_BASE}/postComment?commentText=${commentText}&contentType=${contentType}&id=${id}&userId=${userId}&verificationId=${process.env.REACT_APP_VERIFICATION_ID}`
  return request({
    method: 'post',
    url
  })
}
