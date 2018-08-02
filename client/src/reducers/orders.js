import {
  GET_ORDERS_SUCCESS,
  GET_ORDER_SUCCESS,
  CREATE_ORDER_SUCCESS
} from "../actions/types"

const initialState = {
  order: {},
  orders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS:
      return { ...state, order: action.payload }
    case GET_ORDERS_SUCCESS:
      return { ...state, orders: action.payload }
    case CREATE_ORDER_SUCCESS:
      return state
    default:
      return state
  }
}
