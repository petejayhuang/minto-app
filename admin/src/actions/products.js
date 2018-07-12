import customAxios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE
} from './types'

// =====================================================
// ================     GET PRODUCTS     ===============
// =====================================================
export const getProducts = () => async dispatch => {
  dispatch(getProductsRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/products`)
    dispatch(getProductsSuccess(data.data))
  } catch (error) {
    dispatch(
      getProductsFailure({
        message: 'Could not get products.',
        error
      })
    )
  }
}

const getProductsRequest = {
  type: GET_PRODUCTS_REQUEST,
  loading: true
}

const getProductsSuccess = categories => ({
  type: GET_PRODUCTS_SUCCESS,
  loading: false,
  payload: categories
})

const getProductsFailure = ({ message, error }) => ({
  type: GET_PRODUCTS_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===============     GET PRODUCT     =================
// =====================================================
export const getProduct = id => async dispatch => {
  dispatch(getProductRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/products/${id}`)
    dispatch(getProductSuccess(data.data))
  } catch (error) {
    dispatch(
      getProductFailure({
        message: 'Could not get product.',
        error
      })
    )
  }
}

const getProductRequest = {
  type: GET_PRODUCT_REQUEST,
  loading: true
}

const getProductSuccess = category => ({
  type: GET_PRODUCT_SUCCESS,
  loading: false,
  payload: category
})

const getProductFailure = ({ message, error }) => ({
  type: GET_PRODUCT_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===============     UPDATE PRODUCT     ==============
// =====================================================
export const updateProduct = id => async dispatch => {
  dispatch(updateProductRequest)

  try {
    const { data } = await customAxios().put(`${URLS.SERVER}/product/${id}`)
    dispatch(updateProductSuccess(data.data))
  } catch (error) {
    dispatch(
      updateProductFailure({
        message: 'Could not get update product.',
        error
      })
    )
  }
}

const updateProductRequest = {
  type: UPDATE_PRODUCT_REQUEST,
  loading: true
}

const updateProductSuccess = updatedProduct => ({
  type: UPDATE_PRODUCT_SUCCESS,
  loading: false,
  payload: updatedProduct
})

const updateProductFailure = ({ message, error }) => ({
  type: UPDATE_PRODUCT_FAILURE,
  loading: false,
  error: { message, error }
})
// =====================================================
// ==============     DELETE PRODUCT     ===============
// =====================================================
export const deleteProduct = id => async dispatch => {
  dispatch(deleteProductRequest)

  try {
    const { data } = await customAxios().delete(`${URLS.SERVER}/products/${id}`)
    dispatch(deleteProductSuccess(data.data))
  } catch (error) {
    dispatch(
      deleteProductFailure({
        message: 'Could not delete product.',
        error
      })
    )
  }
}

const deleteProductRequest = {
  type: DELETE_PRODUCT_REQUEST,
  loading: true
}

const deleteProductSuccess = deletedProduct => ({
  type: DELETE_PRODUCT_SUCCESS,
  loading: false,
  payload: deletedProduct
})

const deleteProductFailure = ({ message, error }) => ({
  type: DELETE_PRODUCT_FAILURE,
  loading: false,
  error: { message, error }
})
