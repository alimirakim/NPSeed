import { basePath } from '../config'
import { setUser } from './userActions'

export const TOKEN = 'TOKEN'
export const SET_TOKEN = 'SET_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const GET_ERRORS = 'GET_ERRORS'

// ACTION CREATORS
// TODO Why does this only work with (around the object)???
export const deleteToken = () => ({ type: DELETE_TOKEN })
export const setToken = token => ({ type: SET_TOKEN, token })

// THUNK ACTION CREATORS
// Login
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
      dispatch(setToken(token))
      dispatch(setUser(user))
    }
  } else {
    dispatch(setLoginErrors(await res.json()))
  }
}

export const setLoginErrors = (err) => {
  console.log("iterable", err.errors)
  return {
    type: GET_ERRORS,
    errors: err.errors
  }
}

// Logout thunk, removes token
export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState()
  const res = await fetch(`${basePath}/users/token`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (res.ok) {
    localStorage.removeItem(TOKEN)
    dispatch(deleteToken())
  }
}

// Load Token
export const loadToken = () => async dispatch => {
  const token = localStorage.getItem(TOKEN)
  if (token) {
    const res = await fetch(`${basePath}/users/token`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
      const user = await res.json()
      console.log("user when token loads?", user)
      dispatch(setToken(token))
      dispatch(setUser(user))
    }
  }
}