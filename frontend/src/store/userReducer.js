import { MAKE_USER } from '../actions/userActions'


function usersReducer(state=[], action) {
  switch (action.type) {
    case MAKE_USER: {
      return [...state, action.user ]
    }
    default:
      return state
  }
}

export default usersReducer