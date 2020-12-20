import { basePath } from '../../config'


// ACTION TYPES
export const GET_USER_CHARS = 'GET_USER_CHARS'
// export const DELETE_CHAR = 'DELETE_CHAR'
// export const MAKE_CHAR = 'MAKE_CHAR'
// export const EDIT_CHAR = 'EDIT_CHAR'

// ACTION CREATORS
const setUserChars = (chars) => ({ type: GET_USER_CHARS, chars })

// THUNK ACTION CREATORS
export const getUserChars = (id) => async (dispatch) => {
  
  const res = await fetch(`${basePath}/characters/users/${id}/categories/1`)
  if (res.ok) {
    console.log("we fetchin?")
    const userChars = await res.json()
    if (userChars[0]) {
      dispatch(setUserChars(userChars))
    }
  }
}
