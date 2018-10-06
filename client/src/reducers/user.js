import {
  AUTHENTICATE_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESSES_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
  addresses: {
    all: [],
    current: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return { ...state, ...action.payload }
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload }
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: {
          all: state.addresses.all,
          current: action.payload
        }
      }
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: {
          all: action.payload,
          current: state.addresses.current
        }
      }
    default:
      return state
  }
}
