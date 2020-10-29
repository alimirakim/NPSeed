import { MAKE_USER } from '../actions/userActions'


function usersReducer(state={}, action) {
  switch (action.type) {
    case MAKE_USER: {
      const newState = {...state}
      newState["users"] = [...newState.users, ...action.user]
      return {...newState }
    }
    default:
      return state
  }
}

export default usersReducer