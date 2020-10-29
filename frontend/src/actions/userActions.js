

export const MAKE_USER = 'MAKE_USER'

export const makeUser = (userData) => {
  return async dispatch => {
    const res = await fetch(`/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const user = res.json()
    if (res.ok) {
      dispatch(setUser(user))
      return res.status(201).json(user)
    }
  }
}

const setUser = (user) => {
  return {
    type: MAKE_USER,
    user,
  }
}