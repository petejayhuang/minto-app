import customAxios from "../utilities/axios"
import { URLS } from "../config/constants"

import {
  GET_PAYMENT_TOKEN_REQUEST,
  GET_PAYMENT_TOKEN_SUCCESS,
  GET_PAYMENT_TOKEN_FAILURE,
  ADD_CARD_TO_CUSTOMER_REQUEST,
  ADD_CARD_TO_CUSTOMER_SUCCESS,
  ADD_CARD_TO_CUSTOMER_FAILURE,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE
} from "./types"

// =====================================================
// =============     GET PAYMENT TOKEN      ============
// =====================================================
export const getPaymentToken = () => async dispatch => {
  getPaymentTokenRequest()
  try {
    const { token } = await customAxios().get(
      `${URLS.SERVER}/admin/payments/checkouts/new`
    )
    dispatch(getPaymentTokenSuccess(token))
  } catch (error) {
    dispatch(
      getPaymentTokenFailure({
        message: "Could not get payment token.",
        error
      })
    )
  }
}

const getPaymentTokenRequest = {
  type: GET_PAYMENT_TOKEN_REQUEST,
  loadingLine: true
}

const getPaymentTokenSuccess = token => ({
  type: GET_PAYMENT_TOKEN_SUCCESS,
  loadingLine: false,
  payload: token
})

const getPaymentTokenFailure = ({ error, message }) => ({
  type: GET_PAYMENT_TOKEN_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===========     ADD CARD TO CUSTOMER      ===========
// =====================================================
export const addCardToCustomer = () => async dispatch => {
  dispatch(addCardToCustomerRequest)
  try {
    const data = await customAxios().post(
      `${URLS.SERVER}/payments/credit_card`,
      {
        number: "4111111111111111",
        expirationDate: "06/2022",
        cvv: "123"
      }
    )
    dispatch(addCardToCustomerSuccess(data))
  } catch (error) {
    dispatch(
      addCardToCustomerFailure({
        message: "Could not add card to customer.",
        error
      })
    )
  }
}

const addCardToCustomerRequest = {
  type: ADD_CARD_TO_CUSTOMER_REQUEST,
  loadingLine: true
}

const addCardToCustomerSuccess = token => ({
  type: ADD_CARD_TO_CUSTOMER_SUCCESS,
  loadingLine: false,
  payload: token
})

const addCardToCustomerFailure = ({ error, message }) => ({
  type: ADD_CARD_TO_CUSTOMER_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ============     CREATE TRANSACTION      ============
// =====================================================
export const createTransaction = () => async dispatch => {
  dispatch(createTransactionRequest)
  try {
    const { data } = await customAxios().post(
      `${URLS.SERVER}/payments/transactions/sale`,
      {
        amount: 12345
      }
    )
    dispatch(createTransactionSuccess(data))
  } catch (error) {
    dispatch(
      createTransactionFailure({
        message: "Could not make transaction.",
        error
      })
    )
  }
}

const createTransactionRequest = {
  type: CREATE_TRANSACTION_REQUEST,
  loadingLine: true
}

const createTransactionSuccess = token => ({
  type: CREATE_TRANSACTION_SUCCESS,
  loadingLine: false,
  payload: token
})

const createTransactionFailure = ({ error, message }) => ({
  type: CREATE_TRANSACTION_FAILURE,
  loadingLine: false,
  error: { message, error }
})
