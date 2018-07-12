import {
  GET_ORDERS_SUCCESS,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS
} from '../actions/types'

const INITIAL_STATE = { list: [], current: {} }

const orders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return { ...state, list: action.payload }
    case GET_ORDER_SUCCESS:
      return { ...state, current: action.payload }
    case UPDATE_ORDER_SUCCESS:
      return state
    case DELETE_ORDER_SUCCESS:
      return state
    default:
      return state
  }
}

export default orders
