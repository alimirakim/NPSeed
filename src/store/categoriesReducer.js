

import {GET_TRAITS} from '../actions/traitActions'

// EXAMPLE
// const stateSample = [
//   {
//     catId: 1,
//     traitType: race,
//     traits: ['human', 'dragonborn'],
//   }
// ]


// List of trait types. Each trait type includes list of traits and category id.
export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case GET_TRAITS:
      return [...state, ...action.traits]
    default:
      return state
  }
}