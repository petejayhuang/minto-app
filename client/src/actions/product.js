import axios from 'axios'

import {
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAILURE,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE
} from './types'

import { URLS } from '../config'

export const getProductCategories = id => async dispatch => {
  dispatch(getProductCategoriesRequest)

  try {
    const { data } = await axios(`${URLS.SERVER}/categories`)
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

export const uploadProduct = id => async dispatch => {
  const fakeBody = {
    user_id: 1,
    category_id: 11,
    description: '',
    shipping_YN: 1,
    meet_in_person_YN: 1,
    images: [
      {
        image_url:
          'https://images.unsplash.com/photo-1497398276231-94ff5dc90217?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f0ce3550fc40a23bb71bda77cd496273&auto=format&fit=crop&w=2700&q=80',
        image_description: '',
        primary_YN: 1
      },
      {
        image_url:
          'https://images.unsplash.com/photo-1506437942396-649fac10a75b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f369ac9dee5618d9719e6b7bed221387&auto=format&fit=crop&w=1350&q=80',
        image_description: '',
        primary_YN: 0
      }
    ]
  }

  dispatch(uploadProductRequest)

  try {
    const { data } = await axios.POST(`${URLS.SERVER}/products`, fakeBody)
    dispatch(uploadProductSuccess())
  } catch (error) {
    dispatch(uploadProductFailure({ message: 'Could not upload user.', error }))
  }
}

const uploadProductRequest = {
  type: UPLOAD_PRODUCT_REQUEST,
  loadingLine: true
}

const uploadProductSuccess = product => ({
  type: UPLOAD_PRODUCT_SUCCESS,
  loadingLine: false,
  payload: product
})

const uploadProductFailure = ({ message, error }) => ({
  type: UPLOAD_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})
