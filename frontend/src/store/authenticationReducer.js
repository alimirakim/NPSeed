import { SET_TOKEN, DELETE_TOKEN } from '../actions/authActions'

function authenticationReducer(state={}, action) {
  switch (action.type) {

    case SET_TOKEN:
      return { ...state, token: action.token }

    case DELETE_TOKEN:
      const newState = { ...state }
      delete newState.token
      return newState

    default:
      return state
  }
}

export default authenticationReducer