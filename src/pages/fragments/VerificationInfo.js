import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { actionCreator } from '../../store'

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading
})

const styles = {
  button: {
    display: 'flex',
    margin: '20px auto 0'
  },
  email: {
    color: 'tomato',
    display: 'block',
    fontStyle: 'italic',
    fontWeight: 500,
    paddingTop: '10px'
  }
}

class VerificationInfo extends React.Component {
  componentDidMount () {
    if (this.props.autosend) {
      this.props.dispatch(actionCreator.AUTH_EMAIL_REQUEST())
    }
  }
  render () {
    return (
      <React.Fragment>
        <Typography align='center' variant='h6' gutterBottom>Verifiy Email</Typography>
        <Typography align='center' variant='subtitle1' gutterBottom>
          Click the button below to send email verification: <span style={styles.email}>{this.props.email}</span>
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => this.props.dispatch(actionCreator.AUTH_EMAIL_REQUEST())}
          style={styles.button}
          disabled={this.props.authLoading}
        >
          Send Verification Email
        </Button>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(VerificationInfo)
