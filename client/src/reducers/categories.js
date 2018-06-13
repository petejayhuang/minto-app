import { GET_PRODUCT_CATEGORIES_SUCCESS } from '../actions/types'

const initialState = [{ product_type: 'Rings' }, { product_type: 'Necklaces' }]

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return action.payload
    default:
      return state
  }
}
