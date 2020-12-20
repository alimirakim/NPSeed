import { GET_GENERATOR } from '../actions/genActions'


export default function generatorReducer(state = {}, action) {
  switch (action.type) {
    case GET_GENERATOR:
      return action.generator
    default:
      return state
  }
}