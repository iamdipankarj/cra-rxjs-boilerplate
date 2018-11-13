import { combineReducers } from 'redux'

import auth from './auth/auth.reducer'
import comment from './comment/comment.reducer'
import feed from './feed/feed.reducer'

export const rootReducer = combineReducers({
  auth,
  comment,
  feed
})
