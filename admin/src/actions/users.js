import customAxios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from './types'

// =====================================================
// =================     GET USERS     =================
// =====================================================
export const getUsers = () => async dispatch => {
  dispatch(getUsersRequest)

  try {
    const { data } = await customAxios()(`${URLS.SERVER}/users`)
    dispatch(getUsersSuccess(data.data))
  } catch (error) {
    dispatch(
      getUsersFailure({
        message: 'Could not get users.',
        error
      })
    )
  }
}

const getUsersRequest = {
  type: GET_USERS_REQUEST,
  loading: true
}

const getUsersSuccess = categories => ({
  type: GET_USERS_SUCCESS,
  loading: false,
  payload: categories
})

const getUsersFailure = ({ message, error }) => ({
  type: GET_USERS_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// =================     GET USER     ==================
// =====================================================
export const getUser = id => async dispatch => {
  dispatch(getUserRequest)
  try {
    const { data } = await customAxios()(`${URLS.SERVER}/users/${id}`)
    dispatch(getUserSuccess(data.data))
  } catch (error) {
    dispatch(
      getUserFailure({
        message: 'Could not get user.',
        error
      })
    )
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

const getUserFailure = ({ message, error }) => ({
  type: GET_USER_FAILURE,
  loading: false,
  error: { message, error }
})

// =====================================================
// ================     UPDATE USER     ================
// =====================================================
export const updateUser = values => async dispatch => {
  dispatch(updateUserRequest)
  const { id, ...noId } = values
  console.log(noId)
  try {
    const { data } = await customAxios().put(
      `${URLS.SERVER}/users/${values.id}`,
      { ...noId }
    )
    dispatch(updateUserSuccess(data.data))
  } catch (error) {
    dispatch(
      updateUserFailure({
        message: 'Could not get update user.',
        error
      })
    )
  }
}

const updateUserRequest = {
  type: UPDATE_USER_REQUEST,
  loading: true
}

const updateUserSuccess = updatedUser => ({
  type: UPDATE_USER_SUCCESS,
  loading: false,
  payload: updatedUser
})

const updateUserFailure = ({ message, error }) => ({
  type: UPDATE_USER_FAILURE,
  loading: false,
  error: { message, error }
})
// =====================================================
// ===============     DELETE USER     =================
// =====================================================
export const deleteUser = id => async dispatch => {
  dispatch(deleteUserRequest)

  try {
    const { data } = await customAxios().delete(`${URLS.SERVER}/users/${id}`)
    dispatch(deleteUserSuccess(data.data))
  } catch (error) {
    dispatch(
      deleteUserFailure({
        message: 'Could not delete user.',
        error
      })
    )
  }
}

const deleteUserRequest = {
  type: DELETE_USER_REQUEST,
  loading: true
}

const deleteUserSuccess = deletedUser => ({
  type: DELETE_USER_SUCCESS,
  loading: false,
  payload: deletedUser
})

const deleteUserFailure = ({ message, error }) => ({
  type: DELETE_USER_FAILURE,
  loading: false,
  error: { message, error }
})
