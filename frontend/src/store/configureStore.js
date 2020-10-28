import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authenticationReducer from './authenticationReducer'

const composeEnhancers = window.__REDUX__DEVTOOLS__EXTENSION__COMPOSE__ || compose

const rootReducer = combineReducers({
  authentication: authenticationReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, logger))
  )
}