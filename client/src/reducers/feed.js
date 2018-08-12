import { GET_INITIAL_FEED_SUCCESS } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INITIAL_FEED_SUCCESS:
      return action.page > 1 ? state.concat(action.payload) : action.payload
    default:
      return state
  }
}
