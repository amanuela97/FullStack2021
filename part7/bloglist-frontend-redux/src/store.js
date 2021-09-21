import { createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'

export default createStore(notificationReducer, composeWithDevTools(
  applyMiddleware(thunk)
))