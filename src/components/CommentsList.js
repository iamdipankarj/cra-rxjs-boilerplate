import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { resolveRemoteCommentsJSX } from '../helpers/comments'
import { getContentType } from '../helpers/feed'

const styles = theme => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 600,
    minHeight: 400,
    overflowX: 'hidden',
    overflowY: 'scroll',
    width: '100%'
  }
})

const mapStateToProps = (state) => {
  const data = state.feed.commentsGate.data
  const feedContext = data ? data[state.feed.currentFeedId] : null
  const userViews = feedContext ? feedContext.userViews : []

  const feedObjectViews = feedContext ? feedContext.feedObjectViews : null
  const firstFeedObject = feedObjectViews ? feedObjectViews[0] : null
  const contentDetails = firstFeedObject ? firstFeedObject[getContentType(state.feed.currentContentType)] : null
  const commentList = contentDetails ? contentDetails.commentList : []

  return {
    commentList,
    commentsGate: state.feed.commentsGate,
    contentType: state.feed.currentContentType,
    loading: state.feed.commentsGate.loading,
    parentId: state.feed.currentFeedId,
    userViews
  }
}

class CommentsList extends React.Component {
  hasRemoteComments = (parentId) => {
    return (this.props.commentsGate.data[parentId] !== undefined)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography component='p'>Please click <i>Fetch Comments</i> button to see all the comments.</Typography>
        {this.props.loading ? (
          <CircularProgress className={classes.progress} />
        ) : resolveRemoteCommentsJSX(this.props.commentList, this.props.userViews)}
      </div>
    )
  }
}

CommentsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CommentsList))
