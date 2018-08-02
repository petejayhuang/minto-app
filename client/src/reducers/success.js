import { CLEAR_SUCCESS } from "../actions/types"

const initialState = null

export default (state = initialState, action) => {
  if (action.success) {
    return action.success
  }
  switch (action.type) {
    case CLEAR_SUCCESS:
      return null
    default:
      return state
  }
}
