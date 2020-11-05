import { GET_TAGS } from '../actions/tagActions'


// const example = [
//   {
//     id: 1,
//     type: 'gender',
//     tags: ['boy', 'girl', 'unisex']
//   }
// ]

export default function tagTypesReducer(state=[], action) {
  switch (action.type) {
    case GET_TAGS:
      return [...state, ...action.tags]
  }
}