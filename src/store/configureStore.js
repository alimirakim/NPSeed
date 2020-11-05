import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import authUserReducer from './authUserReducer'
import charactersReducer from './charactersReducer'
import errorsReducer from './errorsReducer'
import categoriesReducer from './categoriesReducer'
import settingsReducer from './settingsReducer'
import generatorReducer from './generatorReducer'

const rootReducer = combineReducers({
  errors: errorsReducer,
  authUser: authUserReducer,
  characters: charactersReducer,
  categories: categoriesReducer,
  setting: settingsReducer,
  generator: generatorReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
}