import customAxios from '../config/axios'
import { URLS } from '../config/constants'

import {
  GET_PRODUCT_LIKES_REQUEST,
  GET_PRODUCT_LIKES_SUCCESS,
  GET_PRODUCT_LIKES_FAILURE,
  ADD_PRODUCT_LIKE_REQUEST,
  ADD_PRODUCT_LIKE_SUCCESS,
  ADD_PRODUCT_LIKE_FAILURE,
  DELETE_PRODUCT_LIKE_REQUEST,
  DELETE_PRODUCT_LIKE_SUCCESS,
  DELETE_PRODUCT_LIKE_FAILURE
} from './types'

// =====================================================
// =================     GET LIKES     =================
// =====================================================
export const getProductLikes = () => async dispatch => {
  dispatch(getProductLikesRequest)

  try {
    const { data } = await customAxios()('/likes')
    // console.log(data)
    dispatch(getProductLikesSuccess(data.likes.rows))
  } catch (error) {
    dispatch(
      getProductLikesFailure({
        message: 'Could not get likes.',
        error
      })
    )
  }
}

const getProductLikesRequest = {
  type: GET_PRODUCT_LIKES_REQUEST,
  loadingLine: true
}

const getProductLikesSuccess = likes => ({
  type: GET_PRODUCT_LIKES_SUCCESS,
  loadingLine: false,
  payload: likes
})

const getProductLikesFailure = ({ message, error }) => ({
  type: GET_PRODUCT_LIKES_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     ADD PRODUCT LIKE     =============
// =====================================================
export const addProductLike = id => async dispatch => {
  dispatch(addProductLikeRequest)

  const body = { product_id: id }
  console.log(body)
  try {
    await customAxios().post(`${URLS.SERVER}/likes`, body)
    dispatch(addProductLikeSuccess)
  } catch (error) {
    dispatch(
      addProductLikeFailure({
        message: 'Could not like item',
        error
      })
    )
  }
}

const addProductLikeRequest = {
  type: ADD_PRODUCT_LIKE_REQUEST,
  loadingLine: true
}

const addProductLikeSuccess = {
  type: ADD_PRODUCT_LIKE_SUCCESS,
  loadingLine: false
}

const addProductLikeFailure = ({ message, error }) => ({
  type: ADD_PRODUCT_LIKE_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============     DELETE LIKE     =================
// =====================================================
export const deleteProductLike = id => async dispatch => {
  dispatch(deleteProductLikeRequest)
  try {
    await customAxios().delete(`/likes/${id}`)
    dispatch(deleteProductLikeSuccess)
  } catch (error) {
    dispatch(deleteProductLikeFailure({ message: 'Could remove like.', error }))
  }
}

const deleteProductLikeRequest = {
  type: DELETE_PRODUCT_LIKE_REQUEST,
  loadingLine: true
}

const deleteProductLikeSuccess = {
  type: DELETE_PRODUCT_LIKE_SUCCESS,
  loadingLine: false
}

const deleteProductLikeFailure = ({ message, error }) => ({
  type: DELETE_PRODUCT_LIKE_FAILURE,
  loadingLine: false,
  error: { message, error }
})
