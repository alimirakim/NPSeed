import {GET_USER_CHARS} from '../actions/charActions'

export default function charactersReducer(state={}, action) {
  switch (action.type) {
    case GET_USER_CHARS: {
      console.log("what exactly is action.chars?", action.chars)
      return {...state, [action.chars[0].userId]: action.chars}
    }
    default:
      return state
  }
}