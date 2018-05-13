import { TOGGLE_UI } from "../actions/types"

const initialState = {
  showSettings: false,
  showLoading: false,
  errorMessage: ""
}

export default (state = initialState, action) => {
  if (action.error) {
    return { ...state, errorMessage: action.error }
  }

  // action.loading is false sometimes!
  if (action.loading !== "undefined") {
    console.log(action.loading)
    return { ...state, showLoading: action.loading }
  }

  switch (action.type) {
    case TOGGLE_UI:
      return state
    default:
      return state
  }
}
