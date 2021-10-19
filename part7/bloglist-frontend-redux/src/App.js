import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog, createBlog } from './reducers/blogReducer'
import { setUser, loginUser, addUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom'
import Navigation from './components/Navigation'




const App = () => {
  const [blogs, user] = useSelector(state => [state.blogs, state.users.loggedUser])
  const blogFormRef = useRef()
  const loginFormRef = useRef()
  const registerFormRef = useRef()
  const dispatch = useDispatch()

  const setNotif = (message) => {
    dispatch(setNotification(message,5))
  }


  const handleLogin = (loginObject) => {
    loginFormRef.current.toggleVisibility()
    dispatch(loginUser(loginObject))
  }

  const handleRegister = (registerObject) => {
    registerFormRef.current.toggleVisibility()
    dispatch(addUser(registerObject))
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
      <Router>
        <Navigation user={user}/>
        <Notification />
        <Switch>
          <Route exact path="/users/:id">
            <User blogs={blogs}/>
          </Route>
          <Route exact path="/blogs/:id">
            <Blog
              blogs={blogs}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              loggedUser={user}
            />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/">
            {user === null ?
              <>
                <h1>Welcome</h1>
                <Togglable buttonLabel='login' ref={loginFormRef}>
                  <LoginForm login={handleLogin}/>
                </Togglable>
                <br></br>
                <Togglable buttonLabel='register' ref={registerFormRef}>
                  <RegisterForm register={handleRegister}/>
                </Togglable>
              </>:
              <>
                <h2>blog app</h2>
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                  <BlogForm  addBlog={addBlog}/>
                </Togglable>
                <br/>
                <Blogs blogs={blogs}/>
              </>}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App