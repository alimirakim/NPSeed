import { basePath } from '../config'
import { TOKEN } from './authActions'

export const GET_USER_CHARS = 'GET_USER_CHARS'
// export const DELETE_CHAR = 'DELETE_CHAR'
// export const MAKE_CHAR = 'MAKE_CHAR'
// export const EDIT_CHAR = 'EDIT_CHAR'

export const getUserChars = (id) => async (dispatch) => {
  const token = localStorage.getItem(TOKEN)
  const res = await fetch(`${basePath}/users/${id}/characters`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    const userChars = await res.json()
  console.log("\n\nuserChars fetched is...", userChars)
  dispatch(setUserChars(userChars))
}

function setUserChars(chars) {
  console.log("we setting userChars?", chars)
  return {
    type: GET_USER_CHARS,
    chars
  }
}
