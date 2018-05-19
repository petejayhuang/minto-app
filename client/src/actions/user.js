import axios from "axios"
import { URLS } from "../config"

import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from "./types"

export const getUser = id => async dispatch => {
  dispatch(getUserRequest)
  try {
    const { data } = await axios.get(`${URLS.SERVER}/users/${id}`)
    dispatch(getUserSuccess(data.user))
  } catch (error) {
    dispatch(getUserFailure({ errorMessage: "Could not get user.", error }))
  }
}

const getUserRequest = {
  type: GET_USER_REQUEST,
  loading: true
}

const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  loading: false,
  payload: user
})

const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  loading: false,
  error
})
