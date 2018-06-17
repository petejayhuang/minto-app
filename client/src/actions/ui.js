import { TOGGLE_UI, REDIRECT } from "./types"

export const toggleUi = uiName => {
  return {
    type: TOGGLE_UI,
    payload: uiName
  }
}

export const redirect = path => {
  return {
    type: REDIRECT,
    payload: path
  }
}
