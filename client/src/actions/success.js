import { PRINT_SUCCESS, CLEAR_SUCCESS } from "./types"

export const printSuccess = ({ message, success }) => {
  return {
    type: PRINT_SUCCESS,
    SUCCESS: { message, success }
  }
}

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS
})
