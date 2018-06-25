import axios from "../utilities/axios"
import { URLS } from "../config/constants"
import { redirect } from "./ui"

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE
} from "./types"

// =====================================================
// ================     CREATE ORDER     ===============
// =====================================================
export const createOrder = body => async dispatch => {
  dispatch(createOrderRequest)
  try {
    const data = await axios().post(`${URLS.SERVER}/orders`, body)
    dispatch(createOrderSuccess(data))
    dispatch(redirect("/feed"))
  } catch (error) {
    dispatch(
      createOrderFailure({
        message: "Could not create order.",
        error
      })
    )
  }
}

const createOrderRequest = {
  type: CREATE_ORDER_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage: "Making your order, please don't refresh the page!",
  loadingLine: true
}

const createOrderSuccess = () => ({
  type: CREATE_ORDER_SUCCESS,
  success: "Successfully created order.",
  loadingOverlay: false,
  loadingLine: false
})

const createOrderFailure = ({ message, error }) => ({
  type: CREATE_ORDER_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// =================     GET A ORDER     ===============
// =====================================================
export const getOrder = orderId => async dispatch => {
  dispatch(getOrderRequest)

  try {
    const { data } = await axios()(`${URLS.SERVER}/orders/${orderId}`)
    dispatch(getOrderSuccess(data.data))
  } catch (error) {
    dispatch(
      getOrderFailure({
        message: "Could not that order.",
        error
      })
    )
  }
}

const getOrderRequest = {
  type: GET_ORDER_REQUEST,
  loadingOverlay: true,
  loadingLine: true
}

const getOrderSuccess = order => ({
  type: GET_ORDER_SUCCESS,
  loadingLine: false,
  payload: order
})

const getOrderFailure = ({ message, error }) => ({
  type: GET_ORDER_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============     GET ALL ORDERS     ==============
// =====================================================
export const getOrders = () => async dispatch => {
  dispatch(getOrdersRequest)

  try {
    const { data } = await axios()(`${URLS.SERVER}/orders`)
    dispatch(getOrdersSuccess(data.data))
  } catch (error) {
    dispatch(
      getOrdersFailure({
        message: "Could not get orders.",
        error
      })
    )
  }
}

const getOrdersRequest = {
  type: GET_ORDERS_REQUEST,
  loadingOverlay: true,
  loadingLine: true
}

const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  loadingLine: false,
  payload: orders
})

const getOrdersFailure = ({ message, error }) => ({
  type: GET_ORDERS_FAILURE,
  loadingLine: false,
  error: { message, error }
})
