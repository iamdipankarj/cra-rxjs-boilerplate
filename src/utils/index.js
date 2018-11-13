import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'

export const ListItemLink = (props) => {
  return <ListItem button component={Link} to={props.href} {...props} />
}
