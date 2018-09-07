import { ADD_PRODUCT_TO_ORDER_CONFIRMED } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER_CONFIRMED:
      return action.payload
    default:
      return state
  }
}
