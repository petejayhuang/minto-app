import { TOGGLE_UI } from '../actions/types'

const initialState = {
  loadingLine: false,
  loadingOverlay: false
}

export default (state = initialState, action) => {
  // action.loading is false sometimes!
  if (action.loadingLine === 'true' || action.loadingLine === 'false') {
    return { ...state, showLoadingLine: action.loadingLine }
  }

  if (action.loadingOverlay === 'true' || action.loadingOverlay === 'false') {
    return { ...state, loadingOverlay: action.loadingOverlay }
  }

  switch (action.type) {
    case TOGGLE_UI:
      return { ...state, [action.payload]: !state[action.payload] }
    default:
      return state
  }
}
