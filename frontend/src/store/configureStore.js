import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authenticationReducer from './authenticationReducer'
import userReducer from './userReducer'

const composeEnhancers = window.__REDUX__DEVTOOLS__EXTENSION__COMPOSE__ || compose

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: userReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, logger))
  )
}