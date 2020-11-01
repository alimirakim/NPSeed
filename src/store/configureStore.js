import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import authUserReducer from './authUserReducer'
import charactersReducer from './charactersReducer'
import errorsReducer from './errorsReducer'

const rootReducer = combineReducers({
  authUser: authUserReducer,
  characters: charactersReducer,
  errors: errorsReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
}