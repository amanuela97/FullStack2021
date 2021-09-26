import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog, createBlog } from './reducers/blogReducer'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'




const App = () => {
  const [blogs, user] = useSelector(state => [state.blogs, state.user])
  const blogFormRef = useRef()
  const loginFormRef = useRef()
  const dispatch = useDispatch()

  const setNotif = (message) => {
    dispatch(setNotification(message,5))
  }

  const handleLogin = (loginObject) => {
    loginFormRef.current.toggleVisibility()
    dispatch(loginUser(loginObject))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    setNotif({
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      status: false
    })
  }

  const updateBlog = (updateObject) => {
    dispatch(likeBlog(updateObject))
    setNotif({
      message: `blog ${updateObject.title} was liked`,
      status: false
    })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      setNotif({
        message: `blog ${blog.title} was deleted`,
        status: false
      })
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  return (
    <div className='page-content'>
      <Notification />
      {user === null ?
        <Togglable buttonLabel='login' ref={loginFormRef}>
          <LoginForm login={handleLogin}/>
        </Togglable>:
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm  addBlog={addBlog}/>
          </Togglable>
          <br/>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              loggedUser={user}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App