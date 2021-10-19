import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userState = {
  loggedUser: null,
  usersList: [],
}

const userReducer = (state = userState, action) => {
  switch(action.type){
  case 'SET_USER':
    return { ...state, loggedUser: action.data }
  case 'SET_USERS':
    return { ...state, usersList: action.data }
  case 'LOGOUT':
    return { ...state, loggedUser: null }
  case 'ADD_USER':
    return { ...state, userList: [...state.usersList, action.data] }
  default:
    return state
  }
}

export const setUser = () => {
  return (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch({
          type: 'SET_USER',
          data: user
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const setUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAllUsers()
      dispatch({
        type: 'SET_USERS',
        data: users
      })
    } catch (e) {
      dispatch(setNotification(
        {
          message: e.response.data.error,
          status: e.response.status
        },
        5
      ))
    }
  }
}

export const addUser = (user) => {
  return async dispatch => {
    try {
      const newUser = await userService.addUser(user)
      dispatch({
        type: 'ADD_USER',
        data: newUser
      })
      if(newUser.username){
        dispatch(loginUser({
          username: newUser.username,
          password: user.password
        }))
      }
    } catch (e) {
      dispatch(setNotification(
        {
          message: e.response.data.error,
          status: e.response.status
        },
        5
      ))
    }
  }
}

export const loginUser = (loginObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser())
    } catch (e) {
      dispatch(setNotification(
        {
          message: e.response.data.error,
          status: e.response.status
        },
        5
      ))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer