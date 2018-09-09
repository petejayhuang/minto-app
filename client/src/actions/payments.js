import axios from '../config/axios'
import { URLS } from '../config/constants'
import { redirect } from './ui'
import {
  GET_STRIPE_TOKEN_REQUEST,
  GET_STRIPE_TOKEN_SUCCESS,
  GET_STRIPE_TOKEN_FAILURE,
  BUY_PRODUCT_REQUEST,
  BUY_PRODUCT_SUCCESS,
  BUY_PRODUCT_FAILURE,
  ADD_PRODUCT_TO_ORDER_CONFIRMED
} from './types'

// =====================================================
// =============     GET STRIPE TOKEN     ==============
// =====================================================
export const getStripeTokenRequest = {
  type: GET_STRIPE_TOKEN_REQUEST,
  loadingLine: true
}
export const getStripeTokenSuccess = {
  type: GET_STRIPE_TOKEN_SUCCESS,
  loadingLine: false
}
export const getStripeTokenFailure = error => ({
  type: GET_STRIPE_TOKEN_FAILURE,
  loadingLine: false,
  message: 'Could not complete payment',
  error
})

// =====================================================
// ===============     BUY PRODUCT     =================
// =====================================================
export const buyProduct = ({ stripeToken, product_id }) => async (
  dispatch,
  getState
) => {
  const body = {
    stripeToken,
    product_id
  }
  dispatch(buyProductRequest)
  try {
    // END POINT TBC
    await axios().post(`${URLS.SERVER}/payments/stripe/charge `, body)

    dispatch(buyProductSuccess())
    dispatch(addProductToOrderConfirmed(getState().product))
    dispatch(redirect('/order-confirmation'))
  } catch (error) {
    dispatch(buyProductFailure({ message: 'Could not buy product.', error }))
  }
}
const buyProductRequest = {
  type: BUY_PRODUCT_REQUEST,
  loadingLine: true
}
const buyProductSuccess = () => ({
  type: BUY_PRODUCT_SUCCESS,
  loadingLine: false
})
const buyProductFailure = ({ message, error }) => ({
  type: BUY_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// =====     ADD PRODUCT TO ORDER CONFIRMED     ========
// =====================================================
const addProductToOrderConfirmed = product => ({
  type: ADD_PRODUCT_TO_ORDER_CONFIRMED,
  payload: product
})
