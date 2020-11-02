
// ACTION TYPES
export const GET_ERRORS = 'GET_ERRORS'
export const DELETE_ERRORS = 'DELETE_ERRORS'

// ACTION CREATORS
// TODO Check if this needs to be deconstructed or something
export const setLoginErrors = (err) => ({ type: GET_ERRORS, errors: err.errors })
export const deleteErrors = () => ({type: DELETE_ERRORS})