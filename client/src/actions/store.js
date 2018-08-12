import axios from '../config/axios'
import { URLS } from '../config/constants'

import {
  GET_STORE_INFO_REQUEST,
  GET_STORE_INFO_SUCCESS,
  GET_STORE_INFO_FAILURE,
  GET_INITIAL_STORE_PRODUCTS_REQUEST,
  GET_INITIAL_STORE_PRODUCTS_SUCCESS,
  GET_INITIAL_STORE_PRODUCTS_FAILURE
} from './types'

// =====================================================
// =============      GET STORE INFO     ===============
// =====================================================

export const getStoreInfo = id => async dispatch => {
  dispatch(getStoreInfoRequest)
  try {
    const { data } = await axios().get(`${URLS.SERVER}/users/${id}`)
    dispatch(getStoreInfoSuccess(data.data))
  } catch (error) {
    dispatch(
      getStoreInfoFailure({ message: 'Could not get store info.', error })
    )
  }
}

const getStoreInfoRequest = {
  type: GET_STORE_INFO_REQUEST,
  loadingLine: true
}

const getStoreInfoSuccess = store => ({
  type: GET_STORE_INFO_SUCCESS,
  loadingLine: false,
  payload: store
})

const getStoreInfoFailure = ({ message, error }) => ({
  type: GET_STORE_INFO_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===========      GET STORE PRODUCTS     =============
// =====================================================

export const getStoreProducts = ({
  page,
  limit,
  user_id
}) => async dispatch => {
  dispatch(getStoreProductsRequest)
  try {
    const { data } = await axios()(
      `/products?page=${page}&limit=${limit}&user_id=${user_id}`
    )
    dispatch(getStoreProductsSuccess({ storeProducts: data.data, page }))
  } catch (error) {
    dispatch(
      getStoreProductsFailure({
        message: 'Could not get store products.',
        error
      })
    )
  }
}

const getStoreProductsRequest = {
  type: GET_INITIAL_STORE_PRODUCTS_REQUEST,
  loadingLine: true
}

const getStoreProductsSuccess = ({ storeProducts, page }) => ({
  type: GET_INITIAL_STORE_PRODUCTS_SUCCESS,
  loadingLine: false,
  payload: storeProducts,
  page
})

const getStoreProductsFailure = ({ message, error }) => ({
  type: GET_INITIAL_STORE_PRODUCTS_FAILURE,
  loadingLine: false,
  error: { message, error }
})
