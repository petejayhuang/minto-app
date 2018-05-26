import { PRINT_ERROR, CLEAR_ERROR } from "./types"

export const printError = ({ message, log }) => {
  return {
    type: PRINT_ERROR,
    error: {
      message,
      log
    }
  }
}

export const clearError = () => ({
  type: CLEAR_ERROR
})
