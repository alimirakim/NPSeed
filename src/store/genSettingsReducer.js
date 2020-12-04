
import {
  GET_GEN_SETTINGS,
  CLEAR_GEN_SETTINGS,
  UPDATE_GEN_SETTING,
  DELETE_GEN_SETTING,
} from '../actions/genSettingActions'

export default function genSettingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_GEN_SETTINGS:
      return { ...state, ...action.tagTypes }
    case CLEAR_GEN_SETTINGS:
      return {}
    case UPDATE_GEN_SETTING:
      const tagsToUpdate = new Set(state[action.tagType.type])
      return { ...state, [action.tagType.type]: tagsToUpdate.add(action.tagType.tag) }
    case DELETE_GEN_SETTING:
      const tagsToDelete = new Set(state[action.tagType.type])
      return { ...state, [action.tagType.type]: tagsToDelete.remove(action.tagType.tag) }
    default:
      return state
  }
}