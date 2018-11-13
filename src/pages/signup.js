import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageView from '../components/PageView'
import { Helmet } from 'react-helmet'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { actionCreator } from '../store'
import BasicInfo from './fragments/BasicInfo'
import VerificationInfo from './fragments/VerificationInfo'
import PhotoInfo from './fragments/PhotoInfo'
import FinishSetup from './fragments/FinishSetup'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  layout: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 600
    }
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    position: 'relative',
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      marginTop: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  progress: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  }
})

const mapStateToProps = state => ({
  authActiveStep: state.auth.authActiveStep,
  authDevise: state.auth.authDevise,
  authLoading: state.auth.authLoading,
  authenticated: state.auth.authenticated
})

class Signup extends Component {
  state = {
    steps: ['Basic Information', 'Verify Email', 'Complete Profile'],
    userConfirmPassword: '',
    userEmail: '',
    userFullName: '',
    userPassError: '',
    userPassword: '',
    userPhotoUrl: ''
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfo
            userPassError={this.state.userPassError}
            onEmailChange={(value) => {
              this.setState({
                userEmail: value
              })
            }}
            onPasswordChange={(value) => {
              this.setState({
                userPassword: value
              })
            }}
            confirmPasswordChange={(value) => {
              this.setState({
                userConfirmPassword: value
              })
            }}
          />
        )
      case 1:
        return (
          <VerificationInfo
            autosend
            email={this.state.userEmail}
          />
        )
      case 2:
        return (
          <PhotoInfo
            onNameChange={(value) => {
              this.setState({
                userFullName: value
              })
            }}
            onPicChange={(value) => {
              this.setState({
                userPhotoUrl: value
              })
            }}
          />
        )
      default: {
        console.log('Unknown step.')
      }
    }
  }

  handleNext = (e) => {
    e.preventDefault()
    switch (this.props.authActiveStep) {
      case 0: {
        if (this.state.userPassword !== this.state.userConfirmPassword) {
          this.setState({
            userPassError: 'Passwords do not match'
          })
          return
        }
        this.props.dispatch(actionCreator.AUTH_CREATE_USER_REQUEST({
          email: this.state.userEmail,
          password: this.state.userPassword
        }))
        break
      }
      case 1: {
        this.props.dispatch(actionCreator.AUTH_UPDATE_STEP({
          step: 2
        }))
        break
      }
      case 2: {
        this.props.dispatch(actionCreator.AUTH_PROFILE_REQUEST({
          displayName: this.state.userFullName,
          photoURL: this.state.userPhotoUrl
        }))
        break
      }
      default: {
        throw new Error('Unknown step')
      }
    }
  };

  handleBack = () => {
    this.props.dispatch(actionCreator.AUTH_UPDATE_STEP({
      step: this.props.authActiveStep - 1
    }))
  };

  handleReset = () => {
    this.props.dispatch(actionCreator.AUTH_UPDATE_STEP({
      step: 0
    }))
  };

  render () {
    const { classes, authActiveStep } = this.props
    const { steps } = this.state

    return (
      <PageView>
        <Helmet>
          <title>Sign Up | CRA Admin</title>
        </Helmet>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {this.props.authLoading && (<LinearProgress className={classes.progress} />)}
            <Stepper activeStep={authActiveStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {authActiveStep === steps.length ? (
                <FinishSetup />
              ) : (
                <form onSubmit={this.handleNext} autoComplete='off'>
                  {this.getStepContent(authActiveStep)}
                  <div className={classes.buttons}>
                    {authActiveStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      className={classes.button}
                      disabled={this.props.authLoading}
                    >
                      {authActiveStep === steps.length - 1 ? 'Finish Signup' : 'Next'}
                    </Button>
                  </div>
                </form>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </PageView>
    )
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Signup))
