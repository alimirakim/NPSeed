
// ACTIONS
export const GET_GEN_SETTINGS = 'GET_SETTINGS'
export const CLEAR_GEN_SETTINGS = 'CLEAR_SETTINGS'
export const UPDATE_GEN_SETTING = 'UPDATE_GEN_SETTING'
export const DELETE_GEN_SETTING = 'DELETE_GEN_SETTING'

// ACTION CREATORS
export const clearGenSettings = () => ({ type: CLEAR_GEN_SETTINGS })
export const updateGenSetting = (content) => ({ type: UPDATE_GEN_SETTING, content })
export const deleteGenSetting = (tagType) => ({ type: DELETE_GEN_SETTING, tagType })

export const getGenSettings = (tagTypeChances) => {
  const defaultGenSettings = {}
  for (const t of tagTypeChances) {
    defaultGenSettings[t.type] = new Set()
  }
  return {
    type: GET_GEN_SETTINGS,
    tagTypes: defaultGenSettings
  }
}

// TODO Having a tag type boolean setting that allows it to not include 'chances'; it's only for tagging and categorization. 
//      ROLL THIS IN with 'chanceLock'. If chanceLock is -1, that means there is no chances. 
// TODO Rolling or choosing the traits in individual fields is NOT effected by the generator settings, but it DOES SET generator settings.
// TODO Generator settings can have more than one tag set for a tag type. It's lists, not a string.