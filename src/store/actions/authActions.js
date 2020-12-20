import { basePath } from '../../config'
import { setLoginErrors } from './errActions'


/* ACTION TYPES */
export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const DELETE_USER_TOKEN = 'DELETE_USER_TOKEN'
// localStorage Key
export const TOKEN = 'TOKEN'
export const USER_ID = 'USER_ID'

/* ACTION CREATORS */
export const setUserToken = (token, user) => ({ type: SET_USER_TOKEN, token, user })
export const deleteUserToken = () => {
  localStorage.removeItem(TOKEN)
  console.log("what")
  return { type: DELETE_USER_TOKEN }
}

/* THUNK ACTION CREATORS */
// TODO Try without destructuring
export const makeUser = (userData) => async dispatch => {
  const res = await fetch(`${basePath}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (res.ok) {
    const { token, user } = await res.json()
    if (token) {
      localStorage.setItem(TOKEN, token)
      dispatch(setUserToken(token, user)) // check if received token
    }
  } else {
    const err = await res.json()
    console.log("the fuck err", err)
    dispatch(setLoginErrors(err))
  }
}


// Login and store token
export const login = (username, password) => async dispatch => {
  const res = await fetch(`${basePath}/users/token`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (res.ok) {
    const { token, user } = await res.json()
    if (token) {
      localStorage.setItem(TOKEN, token)
      dispatch(setUserToken(token, user))
    }
  } else {
    const err = await res.json()
    console.log("the fuck err", err)
    dispatch(setLoginErrors(err))
  }
}


// Load Token to check auth
export const loadToken = () => async dispatch => {
  const token = localStorage.getItem(TOKEN)
  if (token) {
    const res = await fetch(`${basePath}/users/token`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // debugger
    if (res.ok) {
      const user = await res.json()
      dispatch(setUserToken(token, user))
    }
  }
}



// TODO Should probably separate this because it's technically a different 'concern'...
// export const getUser = (id) => {
//   return async dispatch => {
//     const res = await fetch(`${basePath}/users/${id}`)
//     if (res.ok) {
//       const user = await res.json()
//       dispatch(setUser(user))
//     }
//   }
// }
