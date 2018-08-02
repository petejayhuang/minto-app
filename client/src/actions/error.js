import { PRINT_ERROR, CLEAR_ERROR } from './types'

export const printError = ({ message, error }) => {
  return {
    type: PRINT_ERROR,
    error: { message, error }
  }
}

export const clearError = () => ({
  type: CLEAR_ERROR
})
