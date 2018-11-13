import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageView from '../components/PageView'
import CardView from '../components/CardView'
import CommentInput from '../components/CommentInput'
import CommentsList from '../components/CommentsList'
import { actionCreator } from '../store'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { getContentType, getChannelDetails } from '../helpers/feed'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Helmet } from 'react-helmet'

const mapStateToProps = state => {
  let { feedLoading, feedErrored, channelViews, userViews } = state.feed
  let feedObjectViews = state.feed.feedObjectViews || []
  return {
    channelViews,
    feedErrored,
    feedLoading,
    feedObjectViews,
    userViews
  }
}

const styles = theme => ({
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  root: {
    flexGrow: 1
  }
})

class Feed extends Component {
  componentDidMount () {
    this.props.dispatch(actionCreator.FETCH_CONTENT_REQUEST({
      contentType: this.props.match.params.contentType,
      id: this.props.match.params.id
    }))
  }
  render () {
    const { classes } = this.props
    return (
      <PageView>
        <Helmet>
          <title>Create Comment | CRA Admin</title>
        </Helmet>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={7}>
              {this.props.feedLoading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <div>
                  {this.props.feedObjectViews.map((feed, index) => {
                    try {
                      const currentContentType = feed[getContentType(feed.contentType)]
                      if (currentContentType) {
                        const channelDetails = getChannelDetails(currentContentType.channelId, this.props.channelViews, this.props.userViews)
                        if (channelDetails) {
                          return (
                            <CardView
                              key={index}
                              data={feed}
                              contentType={getContentType(feed.contentType)}
                              channel={channelDetails}
                            />
                          )
                        }
                      }
                    } catch (error) {
                      console.error(error)
                    }
                    return null
                  })}
                </div>
              )}
            </Grid>
            <Grid item xs={5}>
              <Paper className={classes.paper}>
                <CommentsList />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <CommentInput />
            </Grid>
          </Grid>
        </div>
      </PageView>
    )
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Feed))
