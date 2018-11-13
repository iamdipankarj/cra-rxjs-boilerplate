import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import * as feedAPI from '../../api/feed'
import { actionCreator } from '../action'
import { handleError } from '../utils'
import * as types from '../actionTypes'

const fetchFeedEpic = action$ => {
  return action$.pipe(
    ofType(types.FETCH_CONTENT_REQUEST),
    switchMap((action) => {
      return feedAPI.fetchFeedContent({
        contentType: action.payload.contentType,
        id: action.payload.id,
        verificationId: action.payload.verificationId
      }).pipe(
        map(actionCreator.FETCH_CONTENT_SUCCESS),
        handleError(actionCreator.FETCH_CONTENT_FAIL)
      )
    }
    )
  )
}

const fetchCommentsEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_ALL_COMMENTS_REQUEST),
    switchMap((action) =>
      feedAPI.fetchContentDetails({
        contentType: action.payload.contentType,
        id: action.payload.id
      }).pipe(
        map(actionCreator.FETCH_ALL_COMMENTS_SUCCESS),
        handleError(actionCreator.FETCH_ALL_COMMENTS_FAIL)
      )
    )
  )

export default [fetchFeedEpic, fetchCommentsEpic]
