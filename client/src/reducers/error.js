import { CLEAR_ERROR } from "../actions/types"

const initialState = null

export default (state = initialState, action) => {
  console.log("action.error", action.error)
  if (action.error) {
    return action.error
  }
  switch (action.type) {
    case CLEAR_ERROR:
      return null
    default:
      return state
  }
}
