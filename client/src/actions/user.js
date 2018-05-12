import axios from "axios"
import { apiUrls } from "../config/keys"

import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from "./types"

export const getUser = id => async dispatch => {
  dispatch(getUserRequest())
  try {
    const { data } = await axios.get(`${apiUrls.SERVER_URL}/users/${id}`)
    console.log(data.user)
    dispatch(getUserSuccess(data.user))
  } catch (error) {
    dispatch(getUserFailure())
  }
}

const getUserRequest = () => ({
  type: GET_USER_REQUEST
})

const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user
})
const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error
})
