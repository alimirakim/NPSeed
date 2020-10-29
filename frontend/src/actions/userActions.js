import { basePath } from '../config'

export const MAKE_USER = 'MAKE_USER'

export const makeUser = ({ username, email, password }) => {
  return async dispatch => {
    const res = await fetch(`${basePath}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    if (res.ok) {
      dispatch(setUser({ username, email }))
    }
  }
}

const setUser = (user) => {
  return {
    type: MAKE_USER,
    user
  }
}