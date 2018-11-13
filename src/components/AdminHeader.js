import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ActionButton from './ActionButton'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  actionButton: {
    marginLeft: 'auto'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class AdminHeader extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' noWrap>CRA Admin</Typography>
          <ActionButton />
        </Toolbar>
      </AppBar>
    )
  }
}

export default connect(null)(withStyles(styles)(AdminHeader))
