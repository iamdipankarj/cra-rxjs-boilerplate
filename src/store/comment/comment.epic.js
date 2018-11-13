import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import * as feedAPI from '../../api/feed'
import { actionCreator } from '../action'
import { handleError } from '../utils'
import * as types from '../actionTypes'

const fetchFeedEpic = action$ => {
  return action$.pipe(
    ofType(types.PUSH_COMMENT_REQUEST),
    switchMap((action) => {
      return feedAPI.postFeedComment({
        commentText: action.payload.commentText,
        contentType: action.payload.contentType,
        id: action.payload.id,
        userId: action.payload.userId
      }).pipe(
        map(actionCreator.PUSH_COMMENT_SUCCESS),
        handleError(actionCreator.PUSH_COMMENT_FAIL)
      )
    }
    )
  )
}

export default [fetchFeedEpic]
