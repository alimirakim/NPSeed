import { SET_TOKEN, DELETE_TOKEN, GET_ERRORS } from '../actions/authActions'

function authenticationReducer(state = { errors: [] }, action) {
  switch (action.type) {

    case SET_TOKEN:
      return { token: action.token, errors: [] }

    case DELETE_TOKEN:
      return {errors:[]}

    case GET_ERRORS:
      return { ...state, errors: [...action.errors] }
    default:
      return state
  }
}

export default authenticationReducer