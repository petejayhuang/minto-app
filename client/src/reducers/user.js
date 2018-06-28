import { AUTH_FB_WITH_BE_SUCCESS } from "../actions/types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FB_WITH_BE_SUCCESS:
      return action.payload
    default:
      return state
  }
}
