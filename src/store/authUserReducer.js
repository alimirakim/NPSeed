import {
  SET_USER_TOKEN,
  DELETE_USER_TOKEN,
} from '../actions/authActions'

export default function authUserReducer(state = {user: {username: ""}}, action) {
  switch (action.type) {

    case SET_USER_TOKEN:
      return { token: action.token, user: action.user }
    case DELETE_USER_TOKEN:
      return {}

    default:
      return state
  }
}