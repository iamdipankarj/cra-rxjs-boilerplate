import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Sidebar from './Sidebar'
import Snackbar from '@material-ui/core/Snackbar'
import AdminHeader from './AdminHeader'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { actionCreator } from '../store'

const drawerWidth = 240

const mapStateToProps = (state) => {
  let deviseMessages = []
  if (state.comment.commentDevise) {
    deviseMessages.push(state.comment.commentDevise)
  }
  if (state.auth.authDevise) {
    deviseMessages.push(state.auth.authDevise)
  }
  return {
    deviseMessages
  }
}

const styles = theme => ({
  actionButton: {
    marginLeft: 'auto'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    display: 'flex',
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
})

class PageView extends React.Component {
  state = {
    horizontal: 'center',
    snackRemainOpen: true,
    vertical: 'top'
  };

  handleSnackClose = () => {
    this.setState({
      snackRemainOpen: false
    })
  }

  onSnackExited = () => {
    this.props.dispatch(actionCreator.CLEAR_AUTH_ERRORS())
    this.props.dispatch(actionCreator.CLEAR_COMMENT_ERRORS())
    this.setState({
      snackRemainOpen: true
    })
  }

  render () {
    const { classes } = this.props
    const { vertical, horizontal } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminHeader />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
        {this.props.deviseMessages.map((message, index) => {
          return (
            <Snackbar
              key={index}
              onExited={this.onSnackExited}
              anchorOrigin={{ horizontal, vertical }}
              open={this.state.snackRemainOpen}
              autoHideDuration={8000}
              onClose={this.handleSnackClose}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              action={[
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  className={classes.close}
                  onClick={this.handleSnackClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
              message={<span id='message-id'>{message}</span>}
            />
          )
        })}
      </div>
    )
  }
}

PageView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(PageView))
