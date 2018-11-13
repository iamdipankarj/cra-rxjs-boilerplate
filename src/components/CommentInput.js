import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { actionCreator } from '../store'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: 19
  },
  iconSmall: {
    fontSize: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  progress: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  root: {
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    position: 'relative'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
})

const mapStateToProps = state => ({
  commentDevise: state.comment.commentDevise,
  commentLoading: state.comment.commentLoading,
  currentContentType: state.feed.currentContentType,
  currentFeedId: state.feed.currentFeedId
})

class CommentInput extends React.Component {
  state = {
    commentText: '',
    userId: ''
  };

  onCommentChange = (e) => {
    this.setState({
      commentText: e.target.value
    })
  }

  onUserIdChange = (e) => {
    this.setState({
      userId: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { currentFeedId, currentContentType } = this.props
    this.props.dispatch(actionCreator.PUSH_COMMENT_REQUEST({
      commentText: this.state.commentText,
      contentType: currentContentType,
      id: currentFeedId,
      userId: this.state.userId
    }))
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          {this.props.commentLoading && (<LinearProgress className={classes.progress} />)}
          <form onSubmit={this.handleSubmit} className={classes.container} autoComplete='off'>
            <TextField
              required
              id='user-id'
              label='User Id...'
              className={classNames(classes.textField, classes.dense)}
              helperText='Please type the userId of whom behalf the comment will be posted.'
              onChange={this.onUserIdChange}
              margin='dense'
              disabled={this.props.commentLoading}
            />
            <TextField
              required
              id='user-comment'
              label='Comment...'
              onChange={this.onCommentChange}
              className={classNames(classes.textField, classes.dense)}
              margin='dense'
              disabled={this.props.commentLoading}
            />
            <Button disabled={this.props.commentLoading} type='submit' variant='contained' color='primary' className={classes.button}>
              Send
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

CommentInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CommentInput))
