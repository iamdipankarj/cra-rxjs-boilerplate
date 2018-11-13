import * as React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import { authStateChanged } from './api/auth'
import { connect } from 'react-redux'
import { actionCreator } from './store'
import Dashboard from './pages/dashboard'
import HomePage from './pages/homepage'

const Loading = ({ error }) => {
  if (error) {
    return 'Failed to load the page. Please try reloading the page.'
  } else {
    return <p>Loading...</p>
  }
}

const Signup = Loadable({
  loader: () => import('./pages/signup'),
  loading: Loading
})

const Feed = Loadable({
  loader: () => import('./pages/feed'),
  loading: Loading
})

const Login = Loadable({
  loader: () => import('./pages/login'),
  loading: Loading
})

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        authenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )} />
  )
}

class AppRouter extends React.Component {
  state = {
    authenticated: false,
    loading: true,
    user: null
  };

  componentDidMount () {
    this.removeListener = authStateChanged({
      onError: () => {
        this.setState({
          authenticated: false,
          loading: false
        })
      },
      onSuccess: (userData) => {
        this.props.dispatch(actionCreator.AUTH_SAVE_DATA_REQUEST({
          displayName: userData.displayName,
          email: userData.email,
          emailVerified: userData.emailVerified,
          photoURL: userData.photoURL
        }))
        this.setState({
          authenticated: true,
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    const { authenticated, loading } = this.state
    if (loading) {
      return <p>Loading..</p>
    }

    return (
      <Router>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/login' component={Login} authenticated={authenticated} exact />
          <Route path='/signup' component={Signup} exact />
          <PrivateRoute path='/dashboard' component={Dashboard} authenticated={authenticated} exact />
          <PrivateRoute path='/content/:contentType/:id' component={Feed} authenticated={authenticated} exact />
        </Switch>
      </Router>
    )
  }
}

export default connect(null)(AppRouter)
