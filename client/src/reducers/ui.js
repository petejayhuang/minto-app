import { TOGGLE_UI, REDIRECT } from "../actions/types"

const initialState = {
  loadingLine: false,
  loadingOverlay: false,
  loadingOverlayMessage: "",
  redirect: ""
}

export default (state = initialState, action) => {
  // Check for loading line/overlay
  if (action.loadingLine === true || action.loadingLine === false) {
    return { ...state, loadingLine: action.loadingLine }
  }

  if (action.loadingOverlay === true || action.loadingOverlay === false) {
    return {
      ...state,
      loadingOverlay: action.loadingOverlay,
      loadingOverlayMessage: action.loadingOverlayMessage || ""
    }
  }

  switch (action.type) {
    case TOGGLE_UI:
      return { ...state, [action.payload]: !state[action.payload] }
    case REDIRECT:
      return { ...state, redirect: action.payload }
    default:
      return state
  }
}
