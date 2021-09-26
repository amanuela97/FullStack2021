import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


const userReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_USER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
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

export const loginUser = (loginObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
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

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer