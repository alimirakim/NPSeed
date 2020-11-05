import { basePath } from '../config'


// ACTIONS
export const GET_TRAITS = 'GET_TRAITS'
export const GET_RANDOM_TRAIT = 'GET_RANDOM_TRAIT'
export const GET_RANDOM_TRAITS = 'GET_RANDOM_TRAITS'
export const SET_CHANCES = 'SET_CHANCES'

// ACTION CREATORS
export const setTraits = (traits) => ({ type: GET_TRAITS, traits })


// THUNK ACTION CREATORS
export const getTraitsByCategory = (catId) => async (dispatch) => {
  const res = await fetch(`${basePath}/categories/${catId}`)
  if (res.ok) {
    const traits = await res.json()
    dispatch(setTraits(traits))
  }
}

export const getAllTraits = () => async (dispatch) => {
  const res = await fetch(`${basePath}/categories/traitTypes`)
  if (res.ok) {
    const traits = await res.json()
    dispatch(setTraits(traits))
  }
}