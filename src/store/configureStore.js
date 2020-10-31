import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import authenticationReducer from './authenticationReducer'
import userReducer from './userReducer'
import charactersReducer from './charactersReducer'

// const composeEnhancers = window.__REDUX__DEVTOOLS__EXTENSION__COMPOSE__ || compose

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  characters: charactersReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
}