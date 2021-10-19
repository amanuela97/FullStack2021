import blogServices from '../services/blogs'
import { setNotification } from './notificationReducer'

const byLike = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLike)
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : { ...action.data }).sort(byLike)
  case 'CREATE':
    return [...state, action.data].sort(byLike)
  case 'COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data).sort(byLike)
  case 'DELETE':
    return state.filter((b) => b.id !== action.id).sort(byLike)
  default:
    return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try {
      const data = await blogServices.create(content)
      dispatch({
        type: 'CREATE',
        data
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

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const data = await blogServices.getAll()
      dispatch({
        type: 'INIT',
        data
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

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updated = {
        ...blog,
        user: blog.user.id,
        likes: (blog.likes += 1),
      }
      const data = await blogServices.update(blog.id, updated)
      dispatch({
        type: 'LIKE',
        data
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

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogServices.remove(id)
      dispatch({
        type: 'DELETE',
        id
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

export const commentBlog = (id, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogServices.comment(id, comment)
      dispatch({
        type: 'COMMENT',
        data: commentedBlog
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

export default reducer