import { AUTHENTICATE_SUCCESS, UPDATE_USER_SUCCESS } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return action.payload
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
