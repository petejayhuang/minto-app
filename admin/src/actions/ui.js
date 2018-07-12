import { REDIRECT } from "./types"


export const redirect = path => {
  return {
    type: REDIRECT,
    payload: path
  }
}
