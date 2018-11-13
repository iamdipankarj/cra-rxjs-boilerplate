import * as types from '../actionTypes'

export const initState = {
  channelViews: [],
  commentsGate: {
    commentErrors: null,
    data: {},
    errored: false,
    loading: false,
    parentId: null
  },
  currentAppPath: '/',
  currentContentType: null,
  currentFeedId: null,
  feedErrored: false,
  feedErrors: null,
  feedLoading: false,
  feedObjectViews: [],
  userViews: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'CHANGE_PATHNAME': {
      return {
        ...state,
        currentAppPath: action.payload.currentPath,
        feedObjectViews: []
      }
    }
    case types.FETCH_CONTENT_REQUEST: {
      return {
        ...state,
        currentContentType: action.payload.contentType,
        currentFeedId: action.payload.id,
        feedErrors: null,
        feedLoading: true,
        feedObjectViews: [],
        userViews: []
      }
    }
    case types.FETCH_CONTENT_SUCCESS: {
      const { payload } = action
      if (!payload) return { ...state, feedLoading: false }
      const { feedObjectViews, channelViews, userViews } = action.payload
      if (!feedObjectViews || !userViews) {
        return { ...state, feedLoading: false }
      }
      return {
        ...state,
        channelViews,
        feedErrored: false,
        feedLoading: false,
        feedObjectViews: [...feedObjectViews],
        userViews: [...userViews]
      }
    }
    case types.FETCH_CONTENT_FAIL: {
      return {
        ...state,
        feedErrored: true,
        feedErrors: 'An error occurred while fetching the feed. Please try again.',
        feedLoading: false
      }
    }
    case types.FETCH_ALL_COMMENTS_REQUEST: {
      return {
        ...state,
        commentsGate: {
          ...state.commentsGate,
          commentErrors: null,
          loading: true,
          parentId: action.payload.parentId
        }
      }
    }
    case types.FETCH_ALL_COMMENTS_SUCCESS: {
      const key = action.payload.feedObjectViews[0].id
      return {
        ...state,
        commentsGate: {
          ...state.commentsGate,
          data: {
            ...state.commentsGate.data,
            [key]: action.payload
          },
          loading: false
        }
      }
    }
    case types.FETCH_ALL_COMMENTS_FAIL: {
      return {
        ...state,
        commentsGate: {
          ...state.commentsGate,
          commentErrors: 'An error occurred while fetching the comments. Please try again.',
          loading: false
        }
      }
    }
    default: {
      return state
    }
  }
}
