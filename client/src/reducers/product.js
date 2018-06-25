import { GET_PRODUCT_SUCCESS, UPLOAD_PRODUCT_SUCCESS } from "../actions/types"

const initialState = {
  description: "",
  meet_in_person_YN: null,
  shipping_YN: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return action.payload
    case UPLOAD_PRODUCT_SUCCESS:
      return state
    default:
      return state
  }
}
