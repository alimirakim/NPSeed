import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import authUserReducer from './reducers/authUserReducer'
import charactersReducer from './reducers/charactersReducer'
import errorsReducer from './reducers/errorsReducer'
import categoriesReducer from './reducers/categoriesReducer'
import traitTypesReducer from './reducers/traitTypesReducer'
import traitsReducer from './reducers/traitsReducer'
import tagTypesReducer from './reducers/tagTypesReducer'
import tagsReducer from './reducers/tagsReducer'
import settingsReducer from './reducers/settingsReducer'
import generatorReducer from './reducers/generatorReducer'
import tagTypeChancesReducer from './reducers/tagTypeChancesReducer'
import genSettingsReducer from './reducers/genSettingsReducer'


const rootReducer = combineReducers({
  errors: errorsReducer,
  authUser: authUserReducer,
  characters: charactersReducer,
  categories: categoriesReducer,
  traitTypes: traitTypesReducer,
  traits: traitsReducer,
  tagTypes: tagTypesReducer,
  tags: tagsReducer,
  setting: settingsReducer,
  generator: generatorReducer,
  tagTypeChances: tagTypeChancesReducer,
  genSettings: genSettingsReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logger))
  )
}