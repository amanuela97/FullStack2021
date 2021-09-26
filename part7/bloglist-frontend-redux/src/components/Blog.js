import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ loggedUser, blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)

  let lable = blogVisible ? 'hide' : 'view'

  return (
    <div  style={blogStyle}>
      {blog.title} {blog.author} <button className='toggle' onClick={() => setBlogVisible(!blogVisible)}>{lable}</button>
      {blogVisible &&
            <div>
              <a href={blog.url}>{blog.url}</a>
              <p className='likecount'>likes: {blog.likes}
                <button className='like-button' onClick={() => updateBlog(blog)}>like</button>
              </p>
              <p>{blog.user.name}</p>
              {blog.user.username === loggedUser.username &&
              <button id='delete-button' style={{ backgroundColor: 'red' }} onClick={() => removeBlog(blog)}>remove</button>}
            </div>
      }
    </div>
  )
}

Blog.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog