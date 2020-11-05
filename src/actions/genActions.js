

// ACTIONS
export const GET_GENERATOR = 'GET_GENERATOR'

// ACTION CREATORS
export const setGenerator = generator => ({ type: GET_GENERATOR, generator })

// THUNK ACTION CREATORS
export const getGenerator = (id) => async (dispatch) => {
  const generator = await fetch(`/generator/${id}`)
  dispatch(setGenerator(generator))
}