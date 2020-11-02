
import {SET_SETTINGS, CLEAR_SETTINGS } from '../actions/settingActions'

export default function settingsReducer(state = {}, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return {...state, ...action.settings}
    case CLEAR_SETTINGS:
      return {}
    default:
      return state
  }
}