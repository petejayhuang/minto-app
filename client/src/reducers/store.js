import { GET_STORE_PRODUCTS_SUCCESS } from "../actions/types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORE_PRODUCTS_SUCCESS:
      return action.payload
    default:
      return state
  }
}
