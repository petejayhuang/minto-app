import {
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_SUCCESS
} from '../actions/types'

const INITIAL_STATE = { list: [], current: {} }

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return { ...state, list: action.payload }
    case GET_PRODUCT_CATEGORY_SUCCESS:
      return { ...state, current: action.payload }
    case UPDATE_PRODUCT_CATEGORY_SUCCESS:
      return state
    case DELETE_PRODUCT_CATEGORY_SUCCESS:
      return state
    default:
      return state
  }
}

export default categories
