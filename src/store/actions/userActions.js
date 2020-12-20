// import { basePath } from '../../config'
// import {setLoginErrors} from './errActions'

// export const MAKE_USER = 'MAKE_USER'

// export const makeUser = ({ username, email, password }) => {
//   return async dispatch => {
//     const res = await fetch(`${basePath}/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, password })
//     })
//     if (res.ok) {
//       const user = await res.json()
//       debugger
//       dispatch(setUser(user))
//     } else {
//       dispatch(setLoginErrors(await res.json()))
//     }
//   }
// }

// export const setUser = (user) => {
//   return {
//     type: MAKE_USER,
//     user
//   }
// }

// export const getUser = (id) => {
//   return async dispatch => {
//     const res = await fetch(`${basePath}/users/${id}`)
//     if (res.ok) {
//       const user = await res.json()
//       console.log("gotted user\n\n", user)
//       dispatch(setUser(user))
//     }
//   }
// }
