import { TOGGLE_UI } from "../actions/types"

const initialState = {
  showSettings: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_UI:
      return state
    default:
      return state
  }
}
