import axios from 'axios'

import {
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAILURE,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE
} from './types'
import { URLS } from '../config/constants'

// =====================================================
// ===========     GET PRODUCT CATEORIES     ===========
// =====================================================

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

// =====================================================
// ===============     UPLOAD TO S3     ================
// =====================================================

const uploadToS3UsingSignedUrlPromise = ({ imageName, key, url, image }) =>
  new Promise(async (resolve, reject) => {
    try {
      const request = await axios.put(url, image, {
        headers: { 'Content-Type': image.type }
      })
      resolve(request)
    } catch (e) {
      reject(e)
    }
  })

export const uploadImagesToS3 = ({ images, form }) => async (
  dispatch,
  getState
) => {
  dispatch(uploadImagesToS3Request)
  const { user } = getState()

  // Take array of image objects, and return array of file names
  const imagesNamesArray = images.map(current => current.name)

  try {
    // BE will return an array of uploadConfigs
    const uploadConfigs = await axios.post('/api/upload', {
      images: imagesNamesArray
    })

    const arrayOfUploadToS3Promises = uploadConfigs.data.map(uploadConfig => {
      const { imageName, key, url } = uploadConfig
      const image = images.find(image => image.name === imageName)

      return uploadToS3UsingSignedUrlPromise({
        imageName: imageName,
        key: key,
        url: url,
        image
      })
    })

    const { id, username } = user

    Promise.all(arrayOfUploadToS3Promises).then(values => {
      dispatch(uploadImagesToS3Success(values))
      dispatch(uploadProduct({ ...values, ...form }))
      // req to justin BE
    })
  } catch (error) {
    dispatch(
      uploadImagesToS3Failure({
        message: 'Could not upload image.',
        error
      })
    )
  }
}

const uploadImagesToS3Request = {
  type: UPLOAD_TO_S3_REQUEST,
  loadingOverlay: true
}

const uploadImagesToS3Success = response => ({
  type: UPLOAD_TO_S3_SUCCESS,
  loadingOverlay: false,
  payload: response
})

const uploadImagesToS3Failure = ({ message, error }) => ({
  type: UPLOAD_TO_S3_FAILURE,
  loadingOverlay: false,
  error: { message, error }
})

// =====================================================
// ==============     UPLOAD PRODUCT     ===============
// =====================================================

export const uploadProduct = body => async dispatch => {
  const fakeBody = {
    user_id: 1,
    category_id: 11,
    description: '',
    price: 0,
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
    const { data } = await axios.POST(`${URLS.SERVER}/products`, body)
    dispatch(uploadProductSuccess(data))
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
