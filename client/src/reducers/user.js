import { GET_USER_REQUEST, GET_USER_SUCCESS } from "../actions/types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state
    case GET_USER_SUCCESS:
      return action.payload[0]
    default:
      return state
  }
}
