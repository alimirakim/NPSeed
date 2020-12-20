
import {
  GET_GEN_SETTINGS,
  CLEAR_GEN_SETTINGS,
  UPDATE_GEN_SETTING,
  DELETE_GEN_SETTING,
} from '../actions/genSettingActions'
import { UPDATE_SETTING } from '../actions/settingActions'


export default function genSettingsReducer(state = {}, action) {
  const newState = {...state}
  
  switch (action.type) {
    case GET_GEN_SETTINGS:
      return { ...state, ...action.tagTypes }
    case CLEAR_GEN_SETTINGS:
      return {}
    case UPDATE_GEN_SETTING:
      return {...state, [action.content.traitType]: action.content.trait}
    case DELETE_GEN_SETTING:
      const tagsToDelete = new Set(state[action.tagType.type])
      return { ...state, [action.tagType.type]: tagsToDelete.remove(action.tagType.tag) }
    
      default:
      return state
  }
}