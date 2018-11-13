import * as types from '../actionTypes'

export const initState = {
  authActiveStep: 0,
  authDevise: null,
  authLoading: false,
  authenticated: false,
  displayName: null,
  email: null,
  emailVerified: null,
  photoURL: null
}

const getError = (payload) => {
  const error = payload ? payload.error : null
  return error ? error.message : null
}

export default function (state = initState, action) {
  switch (action.type) {
    case types.AUTH_UPDATE_STEP: {
      return {
        ...state,
        authActiveStep: action.payload.step
      }
    }
    case types.AUTH_CREATE_USER_REQUEST: {
      return {
        ...state,
        authActiveStep: 0,
        authLoading: true
      }
    }
    case types.AUTH_CREATE_USER_SUCCESS: {
      return {
        ...state,
        authActiveStep: 1,
        authLoading: false
      }
    }
    case types.AUTH_CREATE_USER_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An Error occurred while creating the user.',
        authLoading: false
      }
    }
    case types.AUTH_EMAIL_REQUEST: {
      return {
        ...state,
        authLoading: true
      }
    }
    case types.AUTH_EMAIL_SUCCESS: {
      return {
        ...state,
        authLoading: false
      }
    }
    case types.AUTH_EMAIL_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An error occurred while sending the email.',
        authLoading: false
      }
    }
    case types.AUTH_PROFILE_REQUEST: {
      return {
        ...state,
        authActiveStep: 2,
        authLoading: true
      }
    }
    case types.AUTH_PROFILE_SUCCESS: {
      return {
        ...state,
        authActiveStep: 3,
        authLoading: false
      }
    }
    case types.AUTH_PROFILE_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An error occurred while updating the profile.',
        authLoading: false
      }
    }
    case types.AUTH_SAVE_DATA_REQUEST: {
      return {
        ...state,
        authLoading: true
      }
    }
    case types.AUTH_SAVE_DATA_SUCCESS: {
      const { payload } = action
      if (!payload) {
        return {
          ...state,
          authLoading: false
        }
      }
      return {
        ...state,
        authLoading: false,
        authenticated: true,
        displayName: payload.displayName,
        email: payload.email,
        emailVerified: payload.emailVerified,
        photoURL: payload.photoURL
      }
    }
    case types.AUTH_SAVE_DATA_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An error occurred while authenticating you.',
        authLoading: false
      }
    }
    case types.AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        authLoading: true
      }
    }
    case types.AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        authLoading: false,
        authenticated: true
      }
    }
    case types.AUTH_LOGIN_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An error occurred while logging you in.',
        authLoading: false
      }
    }
    case types.AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        authLoading: true
      }
    }
    case types.AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        authLoading: false
      }
    }
    case types.AUTH_LOGOUT_FAIL: {
      const { payload } = action
      return {
        ...state,
        authDevise: getError(payload) || 'An error occurred while logging you out. Please try again.'
      }
    }
    case types.CLEAR_AUTH_ERRORS: {
      return {
        ...state,
        authDevise: null,
        authLoading: false
      }
    }
    case types.AUTH_CLEAR_ALL: {
      return {
        ...state,
        authDevise: null,
        authLoading: false,
        authenticated: false,
        displayName: null,
        email: null,
        emailVerified: null,
        photoURL: null
      }
    }
    default: {
      return state
    }
  }
}
