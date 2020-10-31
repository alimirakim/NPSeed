// import {basePath} from './config'

// const GET_TRAITS = 

// const getAllTraits = () => async (dispatch) => {
//   const res = await fetch(`${basePath}/traits`)
//   if (res.ok) {
//     const traits = await res.json()
//     dispatch(setTraits(traits))
//   }
// }
// const setTraits = (traits) => {
//   return {
//     type: GET_TRAITS,
//     traits,
//   }
// }

// thunkFetch(`/traits/:id`, setTraits)

// traitsRouter.get(`/traits/:id`)


// const thunkFetch = (path, actionCreator) => async (dispatch) => {
//   const response = await fetch(`${basePath}${path}`)
//   if (response.ok) {
//     const result = await response.json()
//     dispatch(actionCreator(result))
//   }
// }