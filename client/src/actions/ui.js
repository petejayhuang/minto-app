import { TOGGLE_UI, REDIRECT } from './types'

export const toggleUi = uiName => ({
  type: TOGGLE_UI,
  payload: uiName
})

export const redirect = path => ({
  type: REDIRECT,
  payload: path
})
