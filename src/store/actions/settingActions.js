

// ACTIONS
export const SET_SETTINGS = 'SET_SETTINGS'
export const GET_SETTINGS = 'GET_SETTINGS'
export const CLEAR_SETTINGS = 'CLEAR_SETTINGS'
export const UPDATE_SETTING = 'UPDATE_SETTING'

// ACTION CREATORS
export const setSetting = (settings) => ({ type: SET_SETTINGS, settings })
export const clearSettings = () => ({ type: CLEAR_SETTINGS })
export const updateSetting = (content) => ({type: UPDATE_SETTING, content})
