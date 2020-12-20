import { GET_USER_CHARS } from '../actions/charActions'

export default function charactersReducer(state = [], action) {
  switch (action.type) {
    
    case GET_USER_CHARS: 
      return [...state, ...action.chars]
      
    default:
      return state
  }
}