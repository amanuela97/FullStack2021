import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdote from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer'


const store = createStore(
    combineReducers({anecdote,notification,filter}), 
    composeWithDevTools(applyMiddleware(thunk))
)

export default store