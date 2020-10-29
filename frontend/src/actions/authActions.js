import { basePath } from '../config'
import { useSelector} from 'react-redux'

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
  const res = await fetch(`${basePath}/token`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (res.ok) {
    const { token } = await res.json()
    if (token) {
      localStorage.setItem(TOKEN, token)
      dispatch(setToken(token))
    }
  }
}

// Logout thunk, removes token
export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState()
  const res = await fetch(`${basePath}/token`, {
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
  const res = await fetch(`${basePath}/token`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (res.ok) {
    dispatch(setToken(token))
  }
}