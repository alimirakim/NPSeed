
// ACTIONS
export const GET_GEN_SETTINGS = 'GET_SETTINGS'
export const CLEAR_GEN_SETTINGS = 'CLEAR_SETTINGS'
export const UPDATE_GEN_SETTING = 'UPDATE_GEN_SETTING'

// ACTION CREATORS
export const clearGenSettings = () => ({ type: CLEAR_GEN_SETTINGS })
export const updateGenSetting = (tagType) => ({ type: UPDATE_GEN_SETTING, tagType })

export const getGenSettings = (tagTypeChances) => {
  const defaultGenSettings = {}
  for (const t of tagTypeChances) {
    defaultGenSettings[t.type] = ""
  }
  return {
    type: GET_GEN_SETTINGS,
    tagTypes: defaultGenSettings
  }
}
