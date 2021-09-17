import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          name='title'
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog,title: target.value })}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          name='author'
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog,author: target.value })}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          name='url'
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog,url: target.value })}
        />
      </div>
      <button id='create-blog' type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm