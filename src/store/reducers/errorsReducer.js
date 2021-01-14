import { GET_ERRORS, DELETE_ERRORS } from '../actions/errActions'

export default function errorsReducer(state = [], action) {
  switch (action.type) {
    
    case GET_ERRORS:
      return action.errors
    case DELETE_ERRORS:
      return []
    default:
      return state
  }
}