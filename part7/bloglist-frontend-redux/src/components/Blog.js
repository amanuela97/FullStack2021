import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import {  Grid, Paper, Typography, IconButton, Link,
  TextField, Box, Button, Divider, ListItem, List, ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'




const useStyles = makeStyles( theme => ({
  markdown: {
    margin: theme.spacing(1),
    padding: `${theme.spacing(1)}px 0`,
  },
  heart: {
    color: '#FF3659',
  },
  delete: {
    color: 'red',
  }

}))


const Blog = ({ blogs, updateBlog, removeBlog, loggedUser }) => {
  if(!blogs[0] || !loggedUser) {
    return null
  }
  const id = useParams().id
  const selectedBlog = blogs.find(b => b.id === id)

  if(!selectedBlog) {
    return <p>blog not found</p>
  }

  const dispatch = useDispatch()
  const classes = useStyles()
  const [comment, setComment] = useState({
    id: selectedBlog.user.id,
    username: selectedBlog.user.username,
    comment: ''
  })

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(selectedBlog.id, comment))
    setComment({ ...comment, comment: '' })
  }
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper elevation={1} className={classes.markdown}>
          <Typography component='h1' variant='h5' gutterBottom>
            {selectedBlog.title}
          </Typography>
          <Typography  variant='subtitle2' gutterBottom>
              author: {selectedBlog.author}
          </Typography>
          <Typography  variant='subtitle2' gutterBottom>
              added by {selectedBlog.user.username}
          </Typography>
          <Typography  variant='subtitle2' gutterBottom>
            url: <Link href={selectedBlog.url}>{selectedBlog.url}</Link>
          </Typography>
          <Typography  variant='subtitle2' gutterBottom>
              likes: {selectedBlog.likes}
          </Typography>
          <IconButton
            aria-label="add to favorites"
            className={classes.heart}
            onClick={() => updateBlog(selectedBlog)}
          >
            <FavoriteIcon />
          </IconButton>
          {selectedBlog.user.username === loggedUser.username &&
            <IconButton
              aria-label="remove"
              className={classes.delete}
              onClick={() => removeBlog(selectedBlog)}
            >
              <DeleteIcon />
            </IconButton>
          }
        </Paper>
        <Paper elevation={0} className={classes.markdown}>
          <Typography component='h1' variant='h6' gutterBottom>
            Comments
          </Typography>
          <Divider/>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            <List>
              {selectedBlog.comments.map( (comment, index) => (
                <ListItem key={comment.id + index} style={{ borderBottom: '1px solid lightgray' }}>
                  <ListItemText
                    primary={comment.comment}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <form onSubmit={handleComment}>
            <TextField
              id="outlined-multiline-static"
              type="text"
              label="comment"
              name="comment"
              multiline
              rows={4}
              onChange={({ target }) => setComment({ ...comment, comment: target.value })}
              value={comment.comment}
            />
            <Box mt={1} mb={1}>
              <Button
                variant='outlined'
                margin='dense'
                color='primary'
                id='add-comment'
                type="submit">add comment</Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  )
}
Blog.propTypes = {
  loggedUser: PropTypes.object,
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}
export default Blog