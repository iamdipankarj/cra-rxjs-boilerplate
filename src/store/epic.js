import { combineEpics } from 'redux-observable'

import authEpic from './auth/auth.epic'
import feedEpic from './feed/feed.epic'
import commentEpic from './comment/comment.epic'

export default combineEpics(
  ...authEpic,
  ...feedEpic,
  ...commentEpic
)
