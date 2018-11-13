import React, { Component } from 'react'
import PageView from '../components/PageView'
import Typography from '@material-ui/core/Typography'

class HomePage extends Component {
  render () {
    return (
      <PageView>
        <Typography variant='body2'>HomePage - BMW India is a subsidiary of the BMW Group. It is based in India and its headquarters are located in Chennai. Its facilities include a manufacturing plant in Chennai which was built in 2007, a parts warehouse in Mumbai, a training center in Gurgaon, NCR, and a network of dealerships. BMW India manufacturers BMW, MINI.</Typography>
      </PageView>
    )
  }
}

export default HomePage
