import {
  AUTH_FB_WITH_BE_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
  GET_PAYMENT_CARDS_SUCCESS
} from "../actions/types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FB_WITH_BE_SUCCESS:
      return action.payload
    case UPDATE_USER_SUCCESS:
      return action.payload
    case LOGOUT_USER:
      localStorage.removeItem("x-auth-token")
      return initialState
    // case GET_PAYMENT_CARDS_SUCCESS:
    //   return {
    //     ...state,
    //     paymentCards: paymentCards(state.paymentCards, action)
    //   }
    default:
      return state
  }
}
