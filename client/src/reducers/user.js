import {
  AUTH_FB_WITH_BE_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER
} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FB_WITH_BE_SUCCESS:
      return action.payload
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload }
    case LOGOUT_USER:
      return initialState
    default:
      return state
  }
}
