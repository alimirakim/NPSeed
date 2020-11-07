

// ACTIONS
export const SET_SETTINGS = 'SET_SETTINGS'
export const GET_SETTINGS = 'GET_SETTINGS'
export const CLEAR_SETTINGS = 'CLEAR_SETTINGS'
export const UPDATE_SETTING = 'CLEAR_SETTING'

// ACTION CREATORS
export const setSetting = (settings) => ({ type: SET_SETTINGS, settings })
export const clearSettings = () => ({ type: CLEAR_SETTINGS })
export const updateSetting = (traitType) => ({type: UPDATE_SETTING, traitType})

export const setSettings = (categories) => {
  const defaultSettings = {}
  for (const c of categories) {
    // defaultSettings[c.category] = {}
    for (const t of c.traitTypes) {
      // defaultSettings[c.category][t.type] = ""
      defaultSettings[t.type] = ""
    }
  }
  return {
    type: GET_SETTINGS, 
    categories: defaultSettings
  }
}

// // THUNK ACTION CREATORS
// export const setAllTraits = (traitTypes) => async (dispatch) => {
//   const randomTraits = traitTypes.map(traitType => {
//     if (!traitType.current) return { ...traitType, current: randomizeTrait(traitType) }
//   })
//   dispatch(setSettings(randomTraits))
// }

// // Gets random trait from traitType's traits list, 
// // then returns new traitType with 'current' updated to the random item
// export const setRandomTrait = (traitType) => {
//   const i = Math.floor(Math.random() * Math.floor(traitType.traits.length))
//   return {
//     type: GET_RANDOM_TRAIT,
//     traitType: { ...traitType, current: traitType.traits[i] }
//   }
// }