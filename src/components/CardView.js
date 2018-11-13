import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FeedMedia from './FeedMedia'
import Button from '@material-ui/core/Button'
import { actionCreator } from '../store'

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: red[500]
  },
  card: {
    maxWidth: '100%'
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

const mapStateToProps = state => ({
  commentsFetchLoading: state.feed.commentsGate.loading,
  currentContentType: state.feed.currentContentType,
  currentFeedId: state.feed.currentFeedId
})

class CardView extends React.Component {
  state = {
    didFetchComments: false
  };

  getPostMeta () {
    return this.props.data[this.props.contentType]
  }

  hasComments () {
    return (this.getPostMeta().commentList !== undefined)
  }

  getDescription () {
    if (this.getPostMeta().contentText !== undefined) {
      return this.getPostMeta().contentText.value
    }
    return null
  }

  handleCommentsFetch = (e) => {
    this.setState({
      didFetchComments: true
    })
    this.props.dispatch(actionCreator.FETCH_ALL_COMMENTS_REQUEST({
      contentType: this.props.currentContentType,
      id: this.props.currentFeedId
    }))
  }

  render () {
    const { classes, channel, contentType, data } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <Button
              disabled={this.props.commentsFetchLoading}
              onClick={this.handleCommentsFetch}
              size='small'
              variant='outlined'
              color='primary'>Fetch Comments</Button>
          }
          title={channel.name || channel.fullName}
          subheader={channel.bio ? channel.bio.value : null}
        />
        <FeedMedia
          contentType={contentType}
          data={{
            url: data[contentType].url,
            urls: data[contentType].urls
          }}
        />
        <CardContent>
          <Typography component='p'>{ this.getDescription() }</Typography>
        </CardContent>
      </Card>
    )
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CardView))
