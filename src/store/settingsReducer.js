
import {SET_SETTINGS, GET_SETTINGS, CLEAR_SETTINGS, UPDATE_SETTING } from '../actions/settingActions'

export default function settingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_SETTINGS:
      return {...state, ...action.categories}
    case SET_SETTINGS:
      return {...state, ...action.settings}
    case CLEAR_SETTINGS:
      return {}
    case UPDATE_SETTING:
      return {...state, [action.traitType.type]: action.traitType.trait}
    default:
      return state
  }
}