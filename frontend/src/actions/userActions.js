import { basePath } from '../config'

export const MAKE_USER = 'MAKE_USER'

export const makeUser = (userData) => {
  console.log("makeUser, userData", userData)
  return async dispatch => {
    const res = await fetch(`${basePath}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const user = await res.json()
    console.log("fetched user", 'user')
    
    if (res.ok) {
      dispatch(setUser(user))
      return await res.status(201).json(user)
    } else {
      return res.status(500).json()
    }
  }
}

const setUser = (user) => {
  return {
    type: MAKE_USER,
    user,
  }
}