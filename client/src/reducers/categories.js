import { GET_PRODUCT_CATEGORIES_SUCCESS } from "../actions/types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return action.payload
    default:
      return state
  }
}
