import {
  GET_STORE_INFO_SUCCESS,
  GET_INITIAL_STORE_PRODUCTS_SUCCESS
} from '../actions/types'

const initialState = {
  info: {},
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORE_INFO_SUCCESS:
      return { ...state, info: action.payload }
    case GET_INITIAL_STORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products:
          action.page > 1
            ? state.products.concat(action.payload)
            : action.payload
      }

    default:
      return state
  }
}
