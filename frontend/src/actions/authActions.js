import { basePath } from '../config'

export const TOKEN = 'TOKEN'
export const SET_TOKEN = 'SET_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

// ACTION CREATORS
// TODO Why does this only work with (around the object)???
export const deleteToken = () => ({ type: DELETE_TOKEN })
export const setToken = token => ({ type: SET_TOKEN, token })

// THUNK ACTION CREATORS
// Login
export const login = (username, password) => async dispatch => {
  console.log("trying to login...")
  const res = await fetch(`${basePath}/token`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  
  if (res.ok) {
    const { token } = await res.json()
    localStorage.setItem(TOKEN, token)
    dispatch(setToken(token))
  }
}

// Logout thunk, removes token
export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState()
  const res = await fetch(`${basePath}/users/:id`, {
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
  console.log("localStorage token", token)
  if (token) dispatch(setToken(token))
}