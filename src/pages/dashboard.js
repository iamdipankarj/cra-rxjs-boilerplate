import React, { Component } from 'react'
import PageView from '../components/PageView'
import { withStyles } from '@material-ui/core/styles'
import ActionCard from '../components/ActionCard'
import Woman1 from '../assets/images/woman1.png'
import Woman2 from '../assets/images/woman2.png'
import Grid from '@material-ui/core/Grid'
import { Helmet } from 'react-helmet'

const styles = {
}

class Dashboard extends Component {
  render () {
    return (
      <PageView>
        <Helmet>
          <title>Dashboard | CRA Admin</title>
        </Helmet>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <ActionCard
              title='Create a comment'
              subtitle='Create a comment on behalf of a user.'
              image={Woman1}
              path='/content/VIDEO/6692054271787008' />
          </Grid>
          <Grid item xs={12} md={3}>
            <ActionCard
              title='Answer quesitons'
              subtitle='Answer questions posted by users.'
              image={Woman2}
              path='/content/VIDEO/6692054271787008' />
          </Grid>
        </Grid>
      </PageView>
    )
  }
}

export default withStyles(styles)(Dashboard)
