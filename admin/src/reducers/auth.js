import { LOGIN_ADMIN_SUCCESS, LOGOUT_ADMIN_SUCCESS } from '../actions/types'

const INITIAL_STATE = {}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_SUCCESS:
      return action.payload
    case LOGOUT_ADMIN_SUCCESS:
      localStorage.removeItem('x-admin-auth-token')
      return INITIAL_STATE
    default:
      return state
  }
}

export default auth
