import { SET_TOKEN, DELETE_TOKEN } from '../actions/authActions'

function authenticationReducer(state={}, action) {
  switch (action.type) {

    case SET_TOKEN:
      return { token: action.token }

    case DELETE_TOKEN:
      return {}

    default:
      return state
  }
}

export default authenticationReducer