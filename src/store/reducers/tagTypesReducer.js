import { GET_ALL_CONTENT } from '../actions/traitActions'


export default function tagTypesReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content.tagTypes
    default:
      return state
  }
}