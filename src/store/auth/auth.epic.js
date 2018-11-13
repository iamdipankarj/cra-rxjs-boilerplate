import { ofType } from 'redux-observable'
import { from } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { actionCreator } from '../action'
import * as types from '../actionTypes'
import * as authAPI from '../../api/auth'
import { handleError } from '../utils'

const createUserEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_CREATE_USER_REQUEST),
    switchMap((action) =>
      from(authAPI.createUser({
        email: action.payload.email,
        password: action.payload.password
      })).pipe(
        map(actionCreator.AUTH_CREATE_USER_SUCCESS),
        handleError(actionCreator.AUTH_CREATE_USER_FAIL)
      )
    )
  )

const sendEmailEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_EMAIL_REQUEST),
    switchMap(() =>
      from(authAPI.sendVerificationEmail()).pipe(
        map(actionCreator.AUTH_EMAIL_SUCCESS),
        handleError(actionCreator.AUTH_EMAIL_FAIL)
      )
    )
  )

const profileEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_PROFILE_REQUEST),
    switchMap((action) =>
      from(authAPI.updateProfile({
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL
      })).pipe(
        map(actionCreator.AUTH_PROFILE_SUCCESS),
        handleError(actionCreator.AUTH_PROFILE_FAIL)
      )
    )
  )

const loginEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_LOGIN_REQUEST),
    switchMap((action) =>
      from(authAPI.signInUser({
        email: action.payload.email,
        password: action.payload.password
      })).pipe(
        map(actionCreator.AUTH_LOGIN_SUCCESS),
        handleError(actionCreator.AUTH_LOGIN_FAIL)
      )
    )
  )

const logoutEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_LOGOUT_REQUEST),
    switchMap((action) =>
      from(authAPI.logoutUser()).pipe(
        map(actionCreator.AUTH_LOGOUT_SUCCESS),
        map(() => action.payload.afterLogout()),
        map(actionCreator.AUTH_CLEAR_ALL),
        handleError(actionCreator.AUTH_LOGOUT_FAIL)
      )
    )
  )

const updateAuthEpic = action$ =>
  action$.pipe(
    ofType(types.AUTH_SAVE_DATA_REQUEST),
    map(action => action.payload),
    map(actionCreator.AUTH_SAVE_DATA_SUCCESS)
  )

export default [createUserEpic, sendEmailEpic, loginEpic, logoutEpic, profileEpic, updateAuthEpic]
