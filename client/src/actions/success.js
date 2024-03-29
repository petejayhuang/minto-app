import { PRINT_SUCCESS, CLEAR_SUCCESS } from './types'

export const printSuccess = message => {
  return {
    type: PRINT_SUCCESS,
    success: message
  }
}

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS
})
