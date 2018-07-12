import customAxios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE
} from './types'

// =====================================================
// =================     GET ORDERS     ================
// =====================================================
export const getOrders = () => async dispatch => {
  dispatch(getOrdersRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/orders`)
    dispatch(getOrdersSuccess(data.data))
  } catch (error) {
    dispatch(
      getOrdersFailure({
        message: 'Could not get orders.',
        error
      })
    )
  }
}

const getOrdersRequest = {
  type: GET_ORDERS_REQUEST,
  loading: true
}

const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  loading: false,
  payload: orders
})

const getOrdersFailure = ({ message, error }) => ({
  type: GET_ORDERS_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===============     GET ORDERS     ==================
// =====================================================
export const getOrder = id => async dispatch => {
  dispatch(getOrderRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/orders/${id}`)
    dispatch(getOrderSuccess(data.data))
  } catch (error) {
    dispatch(
      getOrderFailure({
        message: 'Could not get order.',
        error
      })
    )
  }
}

const getOrderRequest = {
  type: GET_ORDER_REQUEST,
  loading: true
}

const getOrderSuccess = category => ({
  type: GET_ORDER_SUCCESS,
  loading: false,
  payload: category
})

const getOrderFailure = ({ message, error }) => ({
  type: GET_ORDER_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===============     UPDATE ORDERS     ==============
// =====================================================
export const updateOrder = id => async dispatch => {
  dispatch(updateOrderRequest)

  try {
    const { data } = await customAxios().put(`${URLS.SERVER}/orders/${id}`)
    dispatch(updateOrderSuccess(data.data))
  } catch (error) {
    dispatch(
      updateOrderFailure({
        message: 'Could not get update order.',
        error
      })
    )
  }
}

const updateOrderRequest = {
  type: UPDATE_ORDER_REQUEST,
  loading: true
}

const updateOrderSuccess = updatedOrder => ({
  type: UPDATE_ORDER_SUCCESS,
  loading: false,
  payload: updatedOrder
})

const updateOrderFailure = ({ message, error }) => ({
  type: UPDATE_ORDER_FAILURE,
  loading: false,
  error: { message, error }
})
// =====================================================
// ==============     DELETE ORDERS     ================
// =====================================================
export const deleteOrder = id => async dispatch => {
  dispatch(deleteOrderRequest)

  try {
    const { data } = await customAxios().delete(`${URLS.SERVER}/orders/${id}`)
    dispatch(deleteOrderSuccess(data.data))
  } catch (error) {
    dispatch(
      deleteOrderFailure({
        message: 'Could not delete order.',
        error
      })
    )
  }
}

const deleteOrderRequest = {
  type: DELETE_ORDER_REQUEST,
  loading: true
}

const deleteOrderSuccess = deletedOrder => ({
  type: DELETE_ORDER_SUCCESS,
  loading: false,
  payload: deletedOrder
})

const deleteOrderFailure = ({ message, error }) => ({
  type: DELETE_ORDER_FAILURE,
  loading: false,
  error: { message, error }
})
