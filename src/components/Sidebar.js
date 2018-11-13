import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { ListItemLink } from '../utils'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import HomeIcon from '@material-ui/icons/Home'
import LockIcon from '@material-ui/icons/LockRounded'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  itemText: {
    padding: 0
  },
  toolbar: theme.mixins.toolbar
})

class Sidebar extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItemLink href='/dashboard'>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText className={classes.itemText} primary='Dasboard' secondary='All Options' />
          </ListItemLink>
          <ListItemLink href='/content/VIDEO/6692054271787008'>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText className={classes.itemText} primary='Create Comment' secondary='Main Feed' />
          </ListItemLink>
        </List>
        <Divider />
        <List>
          <ListItemLink href='/signup'>
            <ListItemIcon><LockIcon /></ListItemIcon>
            <ListItemText className={classes.itemText} primary='Sign Up' />
          </ListItemLink>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar)
