
import { SET_SETTINGS, GET_SETTINGS, CLEAR_SETTINGS, UPDATE_SETTING } from '../actions/settingActions'
import { UPDATE_GEN_SETTING } from '../actions/genSettingActions'

export default function settingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, ...action.categories }
    case SET_SETTINGS:
      return { ...state, ...action.settings }
    case CLEAR_SETTINGS:
      return {}
    case UPDATE_SETTING:
      return { ...state, [action.content.traitType]: action.content.trait }
    case UPDATE_GEN_SETTING:
      return { ...state, [action.content.traitType]: action.content.trait }
    default:
      return state
  }
}