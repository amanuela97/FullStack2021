import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const setDefaultError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (loginObject) => {
    try {
      loginFormRef.current.toggleVisibility()
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      setDefaultError({
        message: e.response.data.error,
        status: e.response.status
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.create(blogObject)
      setBlogs(blogs.concat(result))
      setUpdate(parseInt(Date.now() * Math.random()))
      setDefaultError({
        message: `a new blog ${result.title} by ${result.author} added`,
        status: result.status
      })
    } catch (e) {
      setDefaultError({
        message: e.response.data.error,
        status: e.response.status
      })
    }
  }

  const updateBlog = async (updateObject, id) => {
    try {
      const updated = {
        user: updateObject.user.id,
        title: updateObject.title,
        author: updateObject.author,
        likes: (updateObject.likes += 1),
      }
      const updatedBlog = await blogService.update(id,updated)
      setDefaultError({
        message: `blog ${updateObject.title} was liked`,
        status: updatedBlog.status
      })
    } catch (e) {
      setDefaultError({
        message: e.response.data.error,
        status: e.response.status
      })
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`remove blog ${blog.title}) by ${blog.author}`)) {
        const deletedBlog = await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setUpdate(parseInt(Date.now() * Math.random()))
        setDefaultError({
          message: `blog ${blog.title} was deleted`,
          status: deletedBlog.status
        })
      }
    } catch (e) {
      setDefaultError({
        message: e.response.data.error,
        status: e.response.status
      })
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }
    fetchBlogs()
  }, [update])

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='page-content'>
      <Notification message={errorMessage}/>
      {user === null ?
        <Togglable buttonLabel='login' ref={loginFormRef}>
          <LoginForm login={handleLogin}/>
        </Togglable>:
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <br/>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                blogUpdate={updateBlog}
                blogRemove={removeBlog}
                loggedUser={user}
              />
            )}
        </div>
      }
    </div>
  )
}

export default App