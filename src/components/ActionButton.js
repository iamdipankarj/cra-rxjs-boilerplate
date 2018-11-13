import React from 'react'
import Button from '@material-ui/core/Button'
import { withRouter, Link } from 'react-router-dom'
import { actionCreator } from '../store'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  actionButton: {
    marginLeft: 'auto'
  },
  profile: {
    color: '#fff',
    fontWeight: 500,
    padding: '0 5px'
  }
})

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  displayName: state.auth.displayName,
  photoURL: state.auth.photoURL
})

class ActionButton extends React.Component {
  state = {
    anchorEl: null
  };

  clearHistory = () => {
    this.handleClose()
    this.props.dispatch(actionCreator.AUTH_LOGOUT_REQUEST({
      afterLogout: () => {
        this.props.history.push('/login')
      }
    }))
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  render () {
    const { anchorEl } = this.state
    const { classes } = this.props
    const open = Boolean(anchorEl)

    return (
      <div className={classes.actionButton}>
        {this.props.authenticated ? (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup='true'
              onClick={this.handleMenu}
              color='inherit'
            >
              {this.props.photoURL ? (
                <Avatar alt={this.props.displayName} src={this.props.photoURL} className={classes.avatar} />
              ) : (
                <AccountCircle />
              )}
              {this.props.displayName && (
                <Typography className={classes.profile} color='textPrimary'>{this.props.displayName}</Typography>
              )}
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top'
              }}
              transformOrigin={{
                horizontal: 'right',
                vertical: 'top'
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.clearHistory}>Log Out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color='inherit' component={Link} to='/login'>Login</Button>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ActionButton)))
