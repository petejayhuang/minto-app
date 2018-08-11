import { GET_FEED_SUCCESS } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_SUCCESS:
      return action.payload
    default:
      return state
  }
}
