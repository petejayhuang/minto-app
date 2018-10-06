import { GET_PRODUCT_LIKES_SUCCESS } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIKES_SUCCESS:
      return action.payload
    default:
      return state
  }
}
