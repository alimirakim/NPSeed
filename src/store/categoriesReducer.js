

import { GET_TRAITS, GET_RANDOM_TRAIT, GET_RANDOM_TRAITS } from '../actions/traitActions'

// EXAMPLE
// const stateSample = [
//   {
//     catId: 1,
//     traitType: race,
//     traits: ['human', 'dragonborn'],
//     current: 'human'
//   }
// ]


// List of trait types. Each trait type includes list of traits and category id.
export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case GET_TRAITS:
      return [...state, ...action.traits]
    case GET_RANDOM_TRAIT:
      return [...state, ...action.traitType]
    case GET_RANDOM_TRAITS:
      return action.traits
    default:
      return state
  }
}