import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const styles = {
  media: {
    height: 140
  }
}

class ActionCard extends React.Component {
  render () {
    const { classes, image, path, title, subtitle } = this.props
    return (
      <Card
        className={classes.card}
      >
        <CardActionArea component={Link} to={path}>
          <CardMedia
            className={classes.media}
            image={image}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>{title}</Typography>
            <Typography component='p'>{subtitle}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

ActionCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ActionCard)
