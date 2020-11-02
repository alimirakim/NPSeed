

// ACTIONS
export const SET_SETTINGS = 'SET_SETTINGS'
export const CLEAR_SETTINGS = 'CLEAR_SETTINGS'

// ACTION CREATORS
export const setSetting = (settings) => ({type: SET_SETTINGS, settings})
export const clearSettings = () => ({type: CLEAR_SETTINGS})

// THUNK ACTION CREATORS
