import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  createButton: {
    marginRight: theme.spacing.unit
  },
  subtitle: {
    fontSize: '13px',
    padding: '20px 0'
  }
})

function FinishSetup (props) {
  const { classes } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        Thank you for signing up.
      </Typography>
      <Typography variant='subtitle1'>
        Welcome to CRA Admin Panel. Use it very carefully. Any unintended changes can be catastrophic. But we surely know that you will make awesome things happen. :-)
      </Typography>
      <Typography className={classes.subtitle} gutterBottom variant='subtitle1'>
        We've prepared the following links to get you started.
      </Typography>
      <Button variant='outlined' color='primary' to='/content/VIDEO/6692054271787008' component={Link} className={classes.createButton}>
        Create Comment
      </Button>
      <Button variant='outlined' color='primary' to='/content/VIDEO/6692054271787008' component={Link} className={classes.createButton}>
        Create Answer
      </Button>
    </React.Fragment>
  )
}

export default withStyles(styles)(FinishSetup)
