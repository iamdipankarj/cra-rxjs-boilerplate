import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading
})

function BasicInfo (props) {
  return (
    <React.Fragment>
      <Typography align='center' variant='h6' gutterBottom>Basic Information</Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            onChange={(e) => props.onEmailChange(e.target.value)}
            type='email'
            id='userEmail'
            name='userEmail'
            label='Email'
            fullWidth
            helperText='The email that you have registered on CRA firebase console.'
            disabled={props.authLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={(e) => props.onPasswordChange(e.target.value)}
            type='password'
            id='userPassword'
            name='userPassword'
            label='Password'
            fullWidth
            disabled={props.authLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={(e) => props.confirmPasswordChange(e.target.value)}
            type='password'
            id='userConfirmPassword'
            name='userConfirmPassword'
            label='Confirm Password'
            error={!!props.userPassError}
            helperText={props.userPassError ? props.userPassError : null}
            fullWidth
            disabled={props.authLoading}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(BasicInfo)
