import {
  GET_SEARCH_RESULTS_SUCCESS,
  RESET_SEARCH_RESULTS
} from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS_SUCCESS:
      if (state.length > 0) {
        return state.concat(action.payload)
      }
      return action.payload
    case RESET_SEARCH_RESULTS:
      return initialState
    default:
      return state
  }
}
