import axios from "../utilities/axios"
import { URLS } from "../config/constants"

import {
  CREATE_STRIPE_TOKEN_REQUEST,
  CREATE_STRIPE_TOKEN_SUCCESS,
  CREATE_STRIPE_TOKEN_FAILURE,
  CREATE_CHARGE_REQUEST,
  CREATE_CHARGE_SUCCESS,
  CREATE_CHARGE_FAILURE,
  GET_PAYMENT_CARDS_REQUEST,
  GET_PAYMENT_CARDS_SUCCESS,
  GET_PAYMENT_CARDS_FAILURE
} from "./types"

// =====================================================
// ==========      CREATE STRIPE TOKEN     =============
// =====================================================
export const createStripeTokenRequest = {
  type: CREATE_STRIPE_TOKEN_REQUEST,
  loadingLine: true
}

export const createStripeTokenSuccess = {
  type: CREATE_STRIPE_TOKEN_SUCCESS,
  loadingLine: false
}

export const createStripeTokenFailure = ({ message, error }) => ({
  type: CREATE_STRIPE_TOKEN_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============      CREATE CHARGE     ===============
// =====================================================
export const createCharge = ({
  amount,
  card_id,
  description,
  email
}) => async dispatch => {
  dispatch(createChargeRequest)
  const body = {
    amount,
    card_id,
    description,
    email
  }
  body.currency = "gbp"
  try {
    const data = await axios().post(
      `${URLS.SERVER}/payments/stripe/charge/create`,
      body
    )
    dispatch(createChargeSuccess(data))
  } catch (error) {
    dispatch(
      createChargeFailure({
        message: "Could not make payment.",
        error
      })
    )
  }
}

const createChargeRequest = {
  type: CREATE_CHARGE_REQUEST,
  loadingLine: true
}

const createChargeSuccess = payment => ({
  type: CREATE_CHARGE_SUCCESS,
  loadingLine: false,
  payload: payment
})

const createChargeFailure = ({ message, error }) => ({
  type: CREATE_CHARGE_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ============      GET PAYMENT CARDS     =============
// =====================================================
export const getPaymentCards = () => async dispatch => {
  dispatch(getPaymentCardsRequest)

  try {
    const data = await axios()(`${URLS.SERVER}/?????????`)
    dispatch(getPaymentCardsSuccess(data))
  } catch (error) {
    dispatch(
      getPaymentCardsFailure({
        message: "Could not get payment cards.",
        error
      })
    )
  }
}

const getPaymentCardsRequest = {
  type: GET_PAYMENT_CARDS_REQUEST,
  loadingLine: true
}

const getPaymentCardsSuccess = payment => ({
  type: GET_PAYMENT_CARDS_SUCCESS,
  loadingLine: false,
  payload: payment
})

const getPaymentCardsFailure = ({ message, error }) => ({
  type: GET_PAYMENT_CARDS_FAILURE,
  loadingLine: false,
  error: { message, error }
})
