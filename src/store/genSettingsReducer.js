
import { GET_GEN_SETTINGS, CLEAR_GEN_SETTINGS, UPDATE_GEN_SETTING } from '../actions/genSettingActions'

export default function genSettingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_GEN_SETTINGS:
      return {...state, ...action.tagTypes}
    case CLEAR_GEN_SETTINGS:
      return {}
    case UPDATE_GEN_SETTING:
      return {...state, [action.tagType.type]: action.tagType.tag}
    default:
      return state
  }
}