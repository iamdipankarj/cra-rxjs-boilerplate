import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import DefaultProfile from '../assets/images/default-profile.png'
import { format } from 'date-fns'

export const denormalizeComments = (commentList = [], userViews = []) => {
  return commentList.map((current, index) => {
    current.userInfo = userViews.find(user => user.userId === current.userId)
    return current
  })
}

const headerStyles = {
  age: {
    color: 'tomato',
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 500,
    verticalAlign: 'bottom'
  },
  bio: {
    color: 'green',
    fontSize: '13px',
    fontWeight: 500
  },
  date: {
    color: '#747474',
    display: 'block',
    fontSize: '12px',
    fontStyle: 'italic'
  },
  header: {
    display: 'inline-block',
    verticalAlign: 'bottom'
  }
}

const TextPrimary = (props) => {
  const age = props.babyAgeInDays < 0 ? 280 + props.babyAgeInDays : props.babyAgeInDays
  return (
    <div>
      <div><span style={headerStyles.header}>{props.header}</span> - <span style={headerStyles.age}>Baby Age: {age} days</span></div>
      <div>
        {props.bio ? (<span style={headerStyles.bio}>{props.bio.value}</span>) : null}
        <span style={headerStyles.date}>{props.date}</span>
      </div>
    </div>
  )
}

export const resolveRemoteCommentsJSX = (commentList = [], userViews = []) => {
  return (
    <List>
      {denormalizeComments(commentList, userViews).slice(0).reverse().map((comment, index) => {
        if (comment.userInfo) {
          const { isAnonymous, profilePicUrl, fullName, babyAgeInDays, bio } = comment.userInfo
          return (
            <ListItem style={{ alignItems: 'flex-start' }} disableGutters key={index} datacommentid={comment.comment}>
              {isAnonymous ? (
                <Avatar>
                  <ImageIcon />
                </Avatar>
              ) : (
                <Avatar
                  alt={fullName}
                  src={profilePicUrl}
                  style={{ height: 40, margin: 0, width: 40 }}
                  imgProps={{ onError: (e) => { e.target.src = DefaultProfile } }}
                />
              )}
              <ListItemText
                inset
                primary={<TextPrimary
                  babyAgeInDays={Number(babyAgeInDays)}
                  bio={bio}
                  header={fullName}
                  date={format(new Date(Number(comment.updatedAt)), 'MMMM Do')}
                />}
                secondary={comment.commentText.value}
              />
            </ListItem>
          )
        }
        return null
      })}
    </List>
  )
}
