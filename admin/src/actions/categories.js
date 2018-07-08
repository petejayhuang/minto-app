import customAxios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  GET_PRODUCT_CATEGORY_REQUEST,
  GET_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_FAILURE,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAILURE,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_FAILURE
} from './types'

// =====================================================
// ==========     GET PRODUCT CATEGORIES     ===========
// =====================================================
export const getProductCategories = () => async dispatch => {
  dispatch(getProductCategoriesRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/categories`)
    dispatch(getProductCategoriesSuccess(data.data))
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
  loading: true
}

const getProductCategoriesSuccess = categories => ({
  type: GET_PRODUCT_CATEGORIES_SUCCESS,
  loading: false,
  payload: categories
})

const getProductCategoriesFailure = ({ message, error }) => ({
  type: GET_PRODUCT_CATEGORIES_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===========     GET PRODUCT CATEGORY     ============
// =====================================================
export const getProductCategory = id => async dispatch => {
  dispatch(getProductCategoryRequest)

  try {
    // const { data } = await customAxios()(`${URLS.SERVER}/categories/${id}`)
    // dispatch(getProductCategorySuccess(data.data))
    const fakedata = {
      category_id: 1,
      product_type: 'Hair and head ornaments',
      description: 'Jewellery for your hair and head'
    }
    dispatch(getProductCategorySuccess(fakedata))
  } catch (error) {
    dispatch(
      getProductCategoryFailure({
        message: 'Could not get product category.',
        error
      })
    )
  }
}

const getProductCategoryRequest = {
  type: GET_PRODUCT_CATEGORY_REQUEST,
  loading: true
}

const getProductCategorySuccess = category => ({
  type: GET_PRODUCT_CATEGORY_SUCCESS,
  loading: false,
  payload: category
})

const getProductCategoryFailure = ({ message, error }) => ({
  type: GET_PRODUCT_CATEGORY_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ==========     UPDATE PRODUCT CATEGORY     ==========
// =====================================================
export const updateProductCategory = id => async dispatch => {
  dispatch(updateProductCategoryRequest)

  try {
    const { data } = await customAxios().put(`${URLS.SERVER}/categories/${id}`)
    dispatch(updateProductCategorySuccess(data.data))
  } catch (error) {
    dispatch(
      updateProductCategoryFailure({
        message: 'Could not get update product category.',
        error
      })
    )
  }
}

const updateProductCategoryRequest = {
  type: UPDATE_PRODUCT_CATEGORY_REQUEST,
  loading: true
}

const updateProductCategorySuccess = updatedCategory => ({
  type: UPDATE_PRODUCT_CATEGORY_SUCCESS,
  loading: false,
  payload: updatedCategory
})

const updateProductCategoryFailure = ({ message, error }) => ({
  type: UPDATE_PRODUCT_CATEGORY_FAILURE,
  loading: false,
  error: { message, error }
})
// =====================================================
// =========     DELETE PRODUCT CATEGORY     ===========
// =====================================================
export const deleteProductCategory = id => async dispatch => {
  dispatch(deleteProductCategoryRequest)

  try {
    const { data } = await customAxios().delete(
      `${URLS.SERVER}/categories/${id}`
    )
    dispatch(deleteProductCategorySuccess(data.data))
  } catch (error) {
    dispatch(
      deleteProductCategoryFailure({
        message: 'Could not delete product category.',
        error
      })
    )
  }
}

const deleteProductCategoryRequest = {
  type: DELETE_PRODUCT_CATEGORY_REQUEST,
  loading: true
}

const deleteProductCategorySuccess = categories => ({
  type: DELETE_PRODUCT_CATEGORY_SUCCESS,
  loading: false,
  payload: categories
})

const deleteProductCategoryFailure = ({ message, error }) => ({
  type: DELETE_PRODUCT_CATEGORY_FAILURE,
  loading: false,
  error: { message, error }
})
