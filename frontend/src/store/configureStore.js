import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { logger } from 'redux-logger'
// import rootReducer from 'rootReducer'
import authorization from 'authorization'

const rootReducer = combineReducers(
  authorization,
  
)

const configureStore = () => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, logger)
)

export default configureStore