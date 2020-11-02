import { basePath } from '../config'


// ACTIONS
export const GET_TRAITS = 'GET_TRAITS'

// ACTION CREATORS
export const setTraits = (traits) => ({ type: GET_TRAITS, traits })

// THUNK ACTION CREATORS
export const getTraitsByCategory = (catId) => async (dispatch) => {
  const res = await fetch(`${basePath}/categories/cats/${catId}`)
  if (res.ok) {
    const traits = await res.json()
    dispatch(setTraits(traits))
  }
}