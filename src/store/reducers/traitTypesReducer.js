import { GET_ALL_CONTENT } from '../actions/traitActions'


export default function traitTypesReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content.traitTypes
    default:
      return state
  }
}