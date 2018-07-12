import {
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS
} from '../actions/types'

const INITIAL_STATE = { list: [], current: {} }

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, list: action.payload }
    case GET_USER_SUCCESS:
      return { ...state, current: action.payload }
    case UPDATE_USER_SUCCESS:
      return state
    case DELETE_USER_SUCCESS:
      return state
    default:
      return state
  }
}

export default categories
