import _ from 'lodash'
import axios from 'axios'
import customAxios from '../config/axios'
import { redirect } from './ui'
import { URLS } from '../config/constants'

import {
  AUTH_FB_WITH_BE_REQUEST,
  AUTH_FB_WITH_BE_SUCCESS,
  AUTH_FB_WITH_BE_FAILURE,
  UPLOAD_SENSITIVE_IMAGE_REQUEST,
  UPLOAD_SENSITIVE_IMAGE_SUCCESS,
  UPLOAD_SENSITIVE_IMAGE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  GET_USERNAME_AVAILABILITY_REQUEST,
  GET_USERNAME_AVAILABILITY_SUCCESS,
  GET_USERNAME_AVAILABILITY_FAILURE,
  LOGOUT_USER
} from './types'

import { uploadImagesToS3 } from './images'

// =====================================================
// ==============      AUTH FB w/ BE     ===============
// =====================================================
export const authenticateFacebookWithBE = accessToken => async dispatch => {
  dispatch(authenticateFacebookWithBERequest)
  try {
    const data = await axios({
      method: 'post',
      url: `${URLS.SERVER}/auth/facebook`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    localStorage.setItem('x-auth-token', data.headers['x-auth-token'])
    dispatch(authenticateFacebookWithBESuccess(data.data))
    if (data.data.username) {
      dispatch(redirect('/feed'))
    }
  } catch (error) {
    dispatch(
      authenticateFacebookWithBEFailure({
        message: 'Could not login with Facebook.',
        error
      })
    )
  }
}
const authenticateFacebookWithBERequest = {
  type: AUTH_FB_WITH_BE_REQUEST,
  loadingLine: true
}
const authenticateFacebookWithBESuccess = user => ({
  type: AUTH_FB_WITH_BE_SUCCESS,
  loadingLine: false,
  payload: user
})
const authenticateFacebookWithBEFailure = ({ message, error }) => ({
  type: AUTH_FB_WITH_BE_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ========      GET USERNAME AVAILABILITY     =========
// =====================================================
export const getUsernameAvailability = username => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(getUsernameAvailabilityRequest)
    try {
      const data = customAxios()(`/users/username_availability/${username}`)
      dispatch(getUsernameAvailabilitySuccess)
      return resolve(data)
    } catch (error) {
      dispatch(
        getUsernameAvailabilityFailure({
          message: 'Could not get username availability.',
          error
        })
      )
      return reject(false)
    }
  })
}
const getUsernameAvailabilityRequest = {
  type: GET_USERNAME_AVAILABILITY_REQUEST,
  loadingLine: true
}
const getUsernameAvailabilitySuccess = {
  type: GET_USERNAME_AVAILABILITY_SUCCESS,
  loadingLine: false
}
const getUsernameAvailabilityFailure = ({ message, error }) => ({
  type: GET_USERNAME_AVAILABILITY_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==========     UPLOAD SENSITIVE IMAGE     ===========
// =====================================================
export const uploadSensitiveImage = ({ images }) => async dispatch => {
  dispatch(uploadSensitiveImageRequest)
  try {
    const image = await dispatch(
      uploadImagesToS3({ images, upload_type: 'document' })
    )

    // TODO use update user action!
    await customAxios().put('/users', {
      national_id_URL: image[0].image_URL
    })

    dispatch(uploadSensitiveImageSuccess)
  } catch (error) {
    dispatch(
      uploadSensitiveImageFailure({
        message: 'Could not upload document.',
        error
      })
    )
  }
}

const uploadSensitiveImageRequest = {
  type: UPLOAD_SENSITIVE_IMAGE_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage:
    "Uploading your document, please don't refresh the page!",
  loadingLine: false
}

const uploadSensitiveImageSuccess = {
  type: UPLOAD_SENSITIVE_IMAGE_SUCCESS,
  loadingOverlay: false,
  loadingLine: false
}

const uploadSensitiveImageFailure = ({ message, error }) => ({
  type: UPLOAD_SENSITIVE_IMAGE_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
  error: { message, error }
})

// TODO update profile pic
// { document_type: 'profile', images: []}

// =====================================================
// ===============      UPDATE USER     ================
// =====================================================

export const updateUser = ({
  first_name,
  last_name,
  email,
  username,
  profile_URL,
  redirect_URL
}) => async dispatch => {
  dispatch(updateUserRequest)

  // make this dynamic, whatever it it receives it will update
  // could be 1 or two!
  const body = _.pickBy(
    {
      first_name,
      last_name,
      email,
      username,
      profile_URL
    },
    _.identity()
  )

  try {
    const { data } = await customAxios().put('/users', body)

    dispatch(updateUserSuccess(data.data))
    if (redirect_URL) {
      dispatch(redirect(redirect_URL))
    }
  } catch (error) {
    dispatch(
      updateUserFailure({
        message: 'Could not update user.',
        error
      })
    )
  }
}

const updateUserRequest = {
  type: UPDATE_USER_REQUEST,
  loadingLine: true
}

const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  loadingLine: false,
  payload: user
})

const updateUserFailure = ({ message, error }) => ({
  type: UPDATE_USER_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     CREATE CUSTOMER     ==============
// =====================================================
export const createCustomer = ({
  first_name,
  last_name,
  email
}) => async dispatch => {
  dispatch(createCustomerRequest)
  try {
    const { data } = await customAxios().post(
      `${URLS.SERVER}/payments/customer`,
      {
        firstName: first_name,
        lastName: last_name,
        email
      }
    )
    dispatch(createCustomerSuccess(data))
  } catch (error) {
    dispatch(
      createCustomerFailure({
        message: 'Could not create customer.',
        error
      })
    )
  }
}

const createCustomerRequest = {
  type: CREATE_CUSTOMER_REQUEST,
  loadingLine: true
}

const createCustomerSuccess = token => ({
  type: CREATE_CUSTOMER_SUCCESS,
  loadingLine: false,
  payload: token
})

const createCustomerFailure = ({ error, message }) => ({
  type: CREATE_CUSTOMER_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============      LOGOUT USER     ================
// =====================================================
export const logoutUser = () => dispatch => {
  console.log('logout action')
  dispatch(redirect('/feed'))
  localStorage.removeItem('x-auth-token')
  dispatch({
    type: LOGOUT_USER
  })
}
