import _ from 'lodash'
import axios from 'axios'
import customAxios from '../config/axios'
import { redirect } from './ui'
import { URLS } from '../config/constants'
import { setAuthToken } from '../utilities/setAuthToken'
import { printSuccess } from './success'

import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USERNAME_AVAILABILITY_REQUEST,
  GET_USERNAME_AVAILABILITY_SUCCESS,
  GET_USERNAME_AVAILABILITY_FAILURE,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  LOGOUT_USER,
  CREATE_BANK_ACCOUNT_REQUEST,
  CREATE_BANK_ACCOUNT_SUCCESS,
  CREATE_BANK_ACCOUNT_FAILURE
} from './types'

// =====================================================
// ===============      CREATE USER     ================
// =====================================================
export const createUser = (body, callback) => async dispatch => {
  dispatch(createUserRequest)
  try {
    const data = await axios({
      method: 'post',
      url: `${URLS.SERVER}/users`,
      data: body
    })

    setAuthToken(data.headers['x-auth-token'])

    dispatch(createUserSuccess(data.data.user))
    callback()
  } catch (error) {
    dispatch(
      createUserFailure({
        message: 'Could not create user.',
        error
      })
    )
  }
}

const createUserRequest = {
  type: CREATE_USER_REQUEST,
  loadingLine: true
}

const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  loadingLine: false,
  payload: user
})

const createUserFailure = ({ message, error }) => ({
  type: CREATE_USER_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ========      GET USERNAME AVAILABILITY     =========
// =====================================================
export const getUsernameAvailability = username => dispatch =>
  new Promise((resolve, reject) => {
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

        break
      case 'email':
        let body = {
          email,
          password
        }
        data = await axios({
          method: 'post',
          url: `${URLS.SERVER}/auth/login`,
          data: body
        })
        break

      default:
        break
    }
    setAuthToken(data.headers['x-auth-token'])
    console.log('username data', data)

    // dispatch(authenticateSuccess(data.data.user))

    // const hasUsername = data.data.user.username

    // if they have an username, it's not their first time here
    // if (hasUsername) {
    //   // send them to feed!
    //   dispatch(redirect('/feed'))
    //   dispatch(printSuccess('Successfully logged in'))
    // } else {
    //   dispatch(redirect('/create-account'))
    // }
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
// ===============      UPDATE USER     ================
// =====================================================
export const updateUser = (body, callback) => async dispatch => {
  dispatch(updateUserRequest)

  const filteredBody = _.pickBy(body, _.identity())

  try {
    const { data } = await customAxios().put('/users', filteredBody)

    dispatch(updateUserSuccess(data.user))
    callback()
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

// =====================================================
// ============    CREATE BANK ACCOUNT     =============
// =====================================================
export const createBankAccount = body => async dispatch => {
  dispatch(createBankAccountRequest)
  try {
    const { data } = await customAxios().put('/users', body)

    dispatch(createBankAccountSuccess(data.user))
    dispatch(printSuccess('New bank account added'))
    dispatch(redirect('/settings'))
  } catch (error) {
    dispatch(
      createBankAccountFailure({
        message: 'Could not add bank account.',
        error
      })
    )
  }
}

const createBankAccountRequest = {
  type: CREATE_BANK_ACCOUNT_REQUEST,
  loadingLine: true
}

const createBankAccountSuccess = bank_account => ({
  type: CREATE_BANK_ACCOUNT_SUCCESS,
  loadingLine: false,
  payload: bank_account
})

const createBankAccountFailure = ({ message, error }) => ({
  type: CREATE_BANK_ACCOUNT_FAILURE,
  loadingLine: false,
  error: { message, error }
})
