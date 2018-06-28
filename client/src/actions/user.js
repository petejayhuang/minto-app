import axios from "../utilities/axios"
import { URLS } from "../config/constants"

import {
  AUTH_FB_WITH_BE_REQUEST,
  AUTH_FB_WITH_BE_SUCCESS,
  AUTH_FB_WITH_BE_FAILURE
} from "./types"

export const authenticateFacebookWithBE = fbResponse => async dispatch => {
  dispatch(authenticateFacebookWithBERequest)
  try {
    console.log(fbResponse)
    const response = await axios().post(
      `${URLS.SERVER}/auth/facebook`,
      fbResponse
    )
    dispatch(authenticateFacebookWithBESuccess(response))
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

const authenticateFacebookWithBESuccess = fbResponse => ({
  type: AUTH_FB_WITH_BE_SUCCESS,
  loadingLine: false,
  payload: fbResponse
})

const authenticateFacebookWithBEFailure = ({ message, error }) => ({
  type: AUTH_FB_WITH_BE_FAILURE,
  loadingLine: false,
  error: { message, error }
})
