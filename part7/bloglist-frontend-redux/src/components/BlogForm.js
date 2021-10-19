import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@material-ui/core'



const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const add = (e) => {
    e.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={add}>
      <div>
        <TextField
          id="title"
          margin="dense"
          label="title"
          name='title'
          value={newBlog.title}
          variant="outlined"
          onChange={({ target }) => setNewBlog({ ...newBlog,title: target.value })}
          size="small"
        />
      </div>
      <div>
        <TextField
          id='author'
          margin="dense"
          label="author"
          name='author'
          value={newBlog.author}
          variant="outlined"
          onChange={({ target }) => setNewBlog({ ...newBlog,author: target.value })}
          size="small"
        />
      </div>
      <div>
        <TextField
          id='url'
          margin="dense"
          label="url"
          name='url'
          value={newBlog.url}
          variant="outlined"
          onChange={({ target }) => setNewBlog({ ...newBlog,url: target.value })}
          size="small"
        />
      </div>
      <Box mt={1} mb={1}>
        <Button
          variant='outlined'
          margin='dense'
          color='primary'
          id='create-blog'
          type="submit">create</Button>
      </Box>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm