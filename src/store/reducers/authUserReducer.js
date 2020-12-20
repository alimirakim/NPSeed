import {
  SET_USER_TOKEN,
  DELETE_USER_TOKEN,
} from '../actions/authActions'

// TODO Is there a better way than these default states to handle??
export default function authUserReducer(state = {user: {username: ""}}, action) {
  switch (action.type) {

    case SET_USER_TOKEN:
      return { token: action.token, user: action.user }
    case DELETE_USER_TOKEN:
      return {user: {username: ""}}

    default:
      return state
  }
}