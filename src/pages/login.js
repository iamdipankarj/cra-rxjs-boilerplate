import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../store'
import PageView from '../components/PageView'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { authStateChanged } from '../api/auth'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing.unit
  },
  form: {
    marginTop: theme.spacing.unit,
    width: '100%'
  },
  layout: {
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 'auto',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 400
    }
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    position: 'relative'
  },
  progress: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

const mapStateToProps = state => ({
  authDevise: state.auth.authDevise,
  authLoading: state.auth.authLoading,
  authenticated: state.auth.authenticated
})

class Login extends Component {
  state = {
    redirectToReferrer: false,
    userEmail: '',
    userPassword: ''
  };

  userEmailChange = (e) => {
    this.setState({
      userEmail: e.target.value
    })
  }

  userPasswordChange = (e) => {
    this.setState({
      userPassword: e.target.value
    })
  }

  componentDidMount () {
    this.removeListener = authStateChanged({
      onError: () => {
        this.setState({
          redirectToReferrer: false
        })
      },
      onSuccess: (userData) => {
        this.setState({
          redirectToReferrer: true
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(actionCreator.AUTH_LOGIN_REQUEST({
      email: this.state.userEmail,
      password: this.state.userPassword
    }))
  }

  render () {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: {
      pathname: '/dashboard'
    } }

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    const { classes } = this.props

    return (
      <PageView>
        <Helmet>
          <title>Login | CRA Admin</title>
        </Helmet>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {this.props.authLoading && (<LinearProgress className={classes.progress} />)}
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <FormControl margin='normal' required fullWidth>
                <TextField
                  required
                  onChange={this.userEmailChange}
                  type='email'
                  id='userEmail'
                  name='userEmail'
                  label='Email'
                  fullWidth
                  disabled={this.props.authLoading}
                />
              </FormControl>

              <FormControl margin='normal' required fullWidth>
                <TextField
                  required
                  onChange={this.userPasswordChange}
                  type='password'
                  id='userPassword'
                  name='userPassword'
                  label='Password'
                  fullWidth
                  disabled={this.props.authLoading}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={this.props.authLoading}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </PageView>
    )
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login))
