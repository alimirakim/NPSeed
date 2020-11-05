

// // ACTIONS
// export const SET_SETTINGS = 'SET_SETTINGS'
// export const CLEAR_SETTINGS = 'CLEAR_SETTINGS'


// // ACTION CREATORS
// export const setSetting = (settings) => ({type: SET_SETTINGS, settings})
// export const clearSettings = () => ({type: CLEAR_SETTINGS})


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