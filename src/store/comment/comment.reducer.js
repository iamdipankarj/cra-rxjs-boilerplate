import * as types from '../actionTypes'

export const initState = {
  commentDevise: null,
  commentLoading: false
}

export default function (state = initState, action) {
  switch (action.type) {
    case types.PUSH_COMMENT_REQUEST: {
      return {
        ...state,
        commentLoading: true
      }
    }
    case types.PUSH_COMMENT_SUCCESS: {
      return {
        ...state,
        commentDevise: 'Comment posted successfully.',
        commentLoading: false
      }
    }
    case types.PUSH_COMMENT_FAIL: {
      return {
        ...state,
        commentDevise: 'There was an error while posting the comment. Please try again.',
        commentLoading: false
      }
    }
    case types.CLEAR_COMMENT_ERRORS: {
      return {
        ...state,
        commentDevise: null,
        commentLoading: false
      }
    }
    default: {
      return state
    }
  }
}
