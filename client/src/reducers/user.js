import { GET_USER_SUCCESS } from '../actions/types'

const initialState = {
  username: 'petejayhuang',
  id: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.payload
    default:
      return state
  }
}
