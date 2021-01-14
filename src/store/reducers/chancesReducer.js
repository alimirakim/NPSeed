import { GET_CHANCES } from '../actions/chanceActions'

// const example = [
//   {
//     genId: 1,
//     type: 'gender',
//     tag: 'boy',
//     chance: 0.40,
//   }
// ]

export default function chancesReducer(state=[], action) {
  switch (action.type) {
    case GET_CHANCES:
      return [...state, action.chances]
    default:
      return state
  }
}