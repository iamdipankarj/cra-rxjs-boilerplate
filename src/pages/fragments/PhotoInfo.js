import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading
})

function PhotoInfo (props) {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Update Profile
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id='fullName'
            label='Full Name'
            onChange={(e) => props.onNameChange(e.target.value)}
            disabled={props.authLoading}
            fullWidth />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            onChange={(e) => props.onPicChange(e.target.value)}
            id='cardNumber'
            label='Profile Pic URL'
            disabled={props.authLoading}
            fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(PhotoInfo)
