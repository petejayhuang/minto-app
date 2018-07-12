import {
  GET_MESSAGE_THREADS_SUCCESS,
  GET_MESSAGE_THREAD_SUCCESS
} from '../actions/types'

const initialState = {
  threads: [],
  currentThread: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE_THREADS_SUCCESS:
      return { ...state, threads: action.payload }
    case GET_MESSAGE_THREAD_SUCCESS:
      return { ...state, currentThread: action.payload }
    default:
      return state
  }
}
