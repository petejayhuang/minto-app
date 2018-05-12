import { TOGGLE_UI } from "./types"

export const toggleUi = uiName => {
  return {
    type: TOGGLE_UI,
    payload: uiName
  }
}
