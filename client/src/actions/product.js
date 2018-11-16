import _ from 'lodash'
import customAxios from '../config/axios'
import { redirect } from './ui'

import {
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE
} from './types'

import { uploadImagesToS3 } from './images'

// =====================================================
// ==========     GET PRODUCT CATEGORIES     ===========
// =====================================================

export const getProductCategories = () => async dispatch => {
  dispatch(getProductCategoriesRequest)

  try {
    const { data } = await customAxios()('/categories')
    dispatch(getProductCategoriesSuccess(data.categories))
  } catch (error) {
    dispatch(
      getProductCategoriesFailure({
        message: 'Could not get product categories.',
        error
      })
    )
  }
}

const getProductCategoriesRequest = {
  type: GET_PRODUCT_CATEGORIES_REQUEST,
  loadingLine: true
}

const getProductCategoriesSuccess = categories => ({
  type: GET_PRODUCT_CATEGORIES_SUCCESS,
  loadingLine: false,
  payload: categories
})

const getProductCategoriesFailure = ({ message, error }) => ({
  type: GET_PRODUCT_CATEGORIES_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============      GET PRODUCT     ================
// =====================================================
export const getProduct = id => async dispatch => {
  dispatch(getProductRequest)
  try {
    const { data } = await customAxios()(`/products/${id}`)
    dispatch(getProductSuccess(data.product))
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
  loadingLine: true
}

const getProductSuccess = product => ({
  type: GET_PRODUCT_SUCCESS,
  loadingLine: false,
  payload: product
})

const getProductFailure = ({ message, error }) => ({
  type: GET_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     UPLOAD PRODUCT     ===============
// =====================================================
export const uploadProduct = ({ images, form }) => async (
  dispatch,
  getState
) => {
  const {
    user: { id }
  } = getState()
  const body = {
    ...form,
    currency_id: 'GBP'
  }

  dispatch(uploadProductRequest)

  try {
    const imageData = await dispatch(
      uploadImagesToS3({ images, upload_type: 'product' })
    )
    body.images = imageData

    await customAxios().post('/products', body)

    dispatch(uploadProductSuccess())

    dispatch(redirect(`/store/${id}`))
  } catch (error) {
    dispatch(
      uploadProductFailure({ message: 'Could not upload product.', error })
    )
  }
}

const uploadProductRequest = {
  type: UPLOAD_PRODUCT_REQUEST,
  loadingLine: true
}

const uploadProductSuccess = () => ({
  type: UPLOAD_PRODUCT_SUCCESS,
  loadingLine: false
})

const uploadProductFailure = ({ message, error }) => ({
  type: UPLOAD_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     UPDATE PRODUCT     ===============
// =====================================================

// notes
// when a field isn't touched, state initial values are passed to this call
export const updateProduct = formValues => async (dispatch, getState) => {
  const {
    user: { id },
    product
  } = getState()

  const pickItems = [
    'category_id',
    'description',
    'hashtags',
    'price',
    'meet_in_person_YN',
    'shipping_YN'
  ]

  const body = _.pick(formValues, pickItems)
  body.currency_id = 'GBP'

  dispatch(updateProductRequest)

  try {
    await customAxios().put(`/products/${product.id}`, body)
    dispatch(updateProductSuccess())
    dispatch(redirect(`/store/${id}`))
  } catch (error) {
    dispatch(
      updateProductFailure({ message: 'Could not update product.', error })
    )
  }
}

const updateProductRequest = {
  type: UPDATE_PRODUCT_REQUEST,
  loadingLine: true
}

const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS,
  loadingLine: false
})

const updateProductFailure = ({ message, error }) => ({
  type: UPDATE_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     DELETE PRODUCT     ===============
// =====================================================
export const deleteProduct = id => async (dispatch, getState) => {
  dispatch(deleteProductRequest)
  try {
    const data = await customAxios().delete(`/products/${id}`)

    dispatch(deleteProductSuccess(data))
    dispatch(redirect('/feed'))
  } catch (error) {
    dispatch(
      deleteProductFailure({ message: 'Could not delete product.', error })
    )
  }
}

const deleteProductRequest = {
  type: DELETE_PRODUCT_REQUEST,
  loadingLine: true
}

const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
  success: 'Product successfully deleted.',
  loadingLine: false
})

const deleteProductFailure = ({ message, error }) => ({
  type: DELETE_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})
