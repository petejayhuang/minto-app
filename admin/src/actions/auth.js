import customAxios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  LOGOUT_ADMIN_SUCCESS
} from './types'

// =====================================================
// ===============     LOGIN ADMIN     =================
// =====================================================
export const loginAdmin = ({ email, password }) => async dispatch => {
  dispatch(loginAdminRequest)

  try {
    const data = await customAxios().post(`${URLS.SERVER}/auth/login`, {
      email,
      password
    })
    localStorage.setItem('x-admin-auth-token', data.headers['x-auth-token'])
    dispatch(loginAdminSuccess(data.data.data))
  } catch (error) {
    dispatch(
      loginAdminFailure({
        message: 'Could not login admin.',
        error
      })
    )
  }
}

const loginAdminRequest = {
  type: LOGIN_ADMIN_REQUEST,
  loading: true
}

const loginAdminSuccess = loggedInAdmin => ({
  type: LOGIN_ADMIN_SUCCESS,
  loading: false,
  payload: loggedInAdmin
})

const loginAdminFailure = ({ message, error }) => ({
  type: LOGIN_ADMIN_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ===============     LOGOUT ADMIN     ================
// =====================================================

export const logoutAdmin = {
  type: LOGOUT_ADMIN_SUCCESS
}
