import _ from 'lodash'
import axios from 'axios'
import customAxios from '../config/axios'
import { redirect } from './ui'
import { URLS } from '../config/constants'
import { setAuthToken } from '../utilities/setAuthToken'

import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USERNAME_AVAILABILITY_REQUEST,
  GET_USERNAME_AVAILABILITY_SUCCESS,
  GET_USERNAME_AVAILABILITY_FAILURE,
  LOGOUT_USER
} from './types'

import { printSuccess } from './success'

// =====================================================
// ===============      AUTHENTICATE     ===============
// =====================================================
export const authenticate = ({
  method,
  // For Facebook Method
  accessToken,
  // For Email/Password method
  email,
  password
}) => async dispatch => {
  dispatch(authenticateRequest)

  try {
    let data

    switch (method) {
      case 'facebook':
        data = await axios({
          method: 'post',
          url: `${URLS.SERVER}/auth/facebook`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        // setAuthToken Util
        setAuthToken(data.headers['x-auth-token'])

        dispatch(authenticateSuccess(data.data))
        break
      case 'email':
        const body = {
          email,
          password
        }
        console.log('body', body)
        data = await axios({
          method: 'post',
          url: `${URLS.SERVER}/auth/login`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body
        })
        break

      default:
        break
    }

    // WITH EMAIL
    const hasUsername = data.data.username

    // if they have an username, it's not their first time here
    if (hasUsername) {
      // send them to feed!
      dispatch(redirect('/feed'))
      dispatch(printSuccess('Successfully logged in'))
    } else {
      dispatch(redirect('/settings/update-profile'))
    }
  } catch (error) {
    dispatch(
      authenticateFailure({
        message: 'Could not login.',
        error
      })
    )
  }
}
const authenticateRequest = {
  type: AUTHENTICATE_REQUEST,
  loadingLine: true
}
const authenticateSuccess = user => ({
  type: AUTHENTICATE_SUCCESS,
  loadingLine: false,
  payload: user
})
const authenticateFailure = ({ message, error }) => ({
  type: AUTHENTICATE_FAILURE,
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
// ===============      LOGOUT USER     ================
// =====================================================
export const logoutUser = () => dispatch => {
  localStorage.removeItem('x-auth-token')
  window.FB.logout(function(response) {})
  dispatch({
    type: LOGOUT_USER
  })

  dispatch(redirect('/feed'))
  dispatch(printSuccess('Successfully logged out'))
}
