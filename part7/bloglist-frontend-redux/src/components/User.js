import React from 'react'
import { useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { List, ListItem, ListItemText ,Link, Typography } from '@material-ui/core'

const User = ({ blogs }) => {
  if(!blogs[0]) {
    return null
  }
  const id = useParams().id
  const userBlogs = blogs.filter(b => b.user.id === id)

  if(!userBlogs[0]) {
    return <p>user has no blogs</p>
  }

  return (
    <>
      <h1>
        {userBlogs[0].user.username}
      </h1>
      <Typography component='h1' variant='h6' gutterBottom>
        added blogs
      </Typography>
      <List>
        {userBlogs.map( (blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={<Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default User