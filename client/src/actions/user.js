import _ from "lodash"
import axios from "axios"
import customAxios from "../utilities/axios"
import { redirect } from "./ui"
import { URLS } from "../config/constants"

import {
  AUTH_FB_WITH_BE_REQUEST,
  AUTH_FB_WITH_BE_SUCCESS,
  AUTH_FB_WITH_BE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USERNAME_AVAILABILITY_REQUEST,
  GET_USERNAME_AVAILABILITY_SUCCESS,
  GET_USERNAME_AVAILABILITY_FAILURE
} from "./types"

// =====================================================
// ==============      AUTH FB w/ BE     ===============
// =====================================================

export const authenticateFacebookWithBE = accessToken => async dispatch => {
  dispatch(authenticateFacebookWithBERequest)
  try {
    const data = await axios({
      method: "post",
      url: `${URLS.SERVER}/auth/facebook`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    localStorage.setItem("x-auth-token", data.headers["x-auth-token"])

    dispatch(authenticateFacebookWithBESuccess(data.data))

    if (data.data.username) {
      dispatch(redirect("/feed"))
    }
  } catch (error) {
    dispatch(
      authenticateFacebookWithBEFailure({
        message: "Could not login with Facebook.",
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
          message: "Could not get username availability.",
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
  username
}) => async dispatch => {
  dispatch(updateUserRequest)

  const body = _.pickBy(
    {
      first_name,
      last_name,
      email,
      username
    },
    _.identity()
  )
  try {
    const { data } = await customAxios().put("/users", body)

    dispatch(updateUserSuccess(data.data))
  } catch (error) {
    dispatch(
      updateUserFailure({
        message: "Could not update user.",
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
