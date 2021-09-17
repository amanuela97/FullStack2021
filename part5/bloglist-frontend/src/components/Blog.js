import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, blogUpdate, blogRemove, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)
  let lable = blogVisible ? 'hide' : 'view'
  const deleteButton = () => {
    if (blog.user.username === loggedUser.username) {
      return (
        <button id='delete-button' style={{ backgroundColor: 'red' }} onClick={() => blogRemove(blog)}>remove</button>
      )
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button className='toggle' onClick={() => setBlogVisible(!blogVisible)}>{lable}</button>
      {blogVisible &&
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p className='likecount'>likes: {blog.likes}
          <button className='like-button' onClick={() => blogUpdate(blog,blog.id)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {deleteButton()}
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  blogUpdate: PropTypes.func,
  blogRemove: PropTypes.func,
}

export default Blog