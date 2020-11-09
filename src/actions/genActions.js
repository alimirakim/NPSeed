import {basePath} from '../config'

// ACTIONS
export const GET_GENERATOR = 'GET_GENERATOR'

// ACTION CREATORS
export const setGenerator = generator => ({ type: GET_GENERATOR, generator })

// THUNK ACTION CREATORS
export const getGenerator = (id) => async (dispatch) => {
  const res = await fetch(`${basePath}/generators/chances/${id}`)
  console.log("res?", res)
  if (res.ok) {
    const generator = await res.json()
    console.log("generator?!", generator)
    dispatch(setGenerator(generator))
  }
}