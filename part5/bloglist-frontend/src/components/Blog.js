import React, { useState } from 'react'
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
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setBlogVisible(!blogVisible)}>{lable}</button>
      {blogVisible &&
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>likes: {blog.likes}
          <button onClick={() => blogUpdate({
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            likes: (blog.likes += 1)
          },blog.id)}>like</button>
        </p>
        <p>{blog.user.username}</p>
        {blog.user.username === loggedUser.username && <button style={{ backgroundColor: 'red' }} onClick={() => blogRemove(blog)}>remove</button>}
      </div>}
    </div>
  )
}

export default Blog