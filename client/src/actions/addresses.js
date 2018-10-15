import axios from '../config/axios'

import { URLS } from '../config/constants'

import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE
} from './types'
import { printSuccess } from './success'

// =====================================================
// ===============      GET ADDRESS     ================
// =====================================================
export const getAddress = id => async dispatch => {
  dispatch(getAddressRequest)
  try {
    const { data } = await axios().get(`/addresses/${id}`)
    console.log('data in getAddress', data)
    dispatch(getAddressSuccess(data.address))
  } catch (error) {
    dispatch(
      getAddressFailure({
        message: 'Could not get address.',
        error
      })
    )
  }
}

const getAddressRequest = {
  type: GET_ADDRESS_REQUEST,
  loadingLine: true
}

const getAddressSuccess = address => ({
  type: GET_ADDRESS_SUCCESS,
  loadingLine: false,
  payload: address
})

const getAddressFailure = ({ message, error }) => ({
  type: GET_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============      GET ADDRESSES     ===============
// =====================================================
export const getAddresses = () => async dispatch => {
  dispatch(getAddressesRequest)
  try {
    const { data } = await axios().get('/addresses')

    dispatch(getAddressesSuccess(data.address.rows))
  } catch (error) {
    dispatch(
      getAddressesFailure({
        message: 'Could not get addresses.',
        error
      })
    )
  }
}

const getAddressesRequest = {
  type: GET_ADDRESSES_REQUEST,
  loadingLine: true
}

const getAddressesSuccess = addresses => ({
  type: GET_ADDRESSES_SUCCESS,
  loadingLine: false,
  payload: addresses
})

const getAddressesFailure = ({ message, error }) => ({
  type: GET_ADDRESSES_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============    CREATE ADDRESS     ===============
// =====================================================
export const createAddress = (body, callback) => async dispatch => {
  dispatch(createAddressRequest)
  try {
    const { data } = await axios().post('/addresses', body)
    dispatch(createAddressSuccess(data.data))
    callback()
  } catch (error) {
    dispatch(
      createAddressFailure({
        message: 'Could not get addresses.',
        error
      })
    )
  }
}

const createAddressRequest = {
  type: CREATE_ADDRESS_REQUEST,
  loadingLine: true
}

const createAddressSuccess = addresses => ({
  type: CREATE_ADDRESS_SUCCESS,
  loadingLine: false,
  payload: addresses
})

const createAddressFailure = ({ message, error }) => ({
  type: CREATE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============      UPDATE ADDRESS     ==============
// =====================================================
export const updateAddress = ({ body, id }, callback) => async dispatch => {
  dispatch(updateAddressRequest)
  try {
    await axios().put(`${URLS.SERVER}/addresses/${id}`, body)
    dispatch(updateAddressSuccess)

    if (callback) {
      callback()
    }
  } catch (error) {
    dispatch(
      updateAddressFailure({
        message: 'Could not update address.',
        error
      })
    )
  }
}

const updateAddressRequest = {
  type: UPDATE_ADDRESS_REQUEST,
  loadingLine: true
}

const updateAddressSuccess = {
  type: UPDATE_ADDRESS_SUCCESS,
  loadingLine: false
}

const updateAddressFailure = ({ message, error }) => ({
  type: UPDATE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============      DELETE ADDRESS     ==============
// =====================================================
export const deleteAddress = id => async dispatch => {
  dispatch(deleteAddressRequest)
  try {
    await axios().delete(`/addresses/${id}`)
    dispatch(deleteAddressSuccess)
    dispatch(printSuccess('Address deleted'))
    dispatch(getAddresses())
  } catch (error) {
    dispatch(
      deleteAddressFailure({
        message: 'Could not delete addresses.',
        error
      })
    )
  }
}

const deleteAddressRequest = {
  type: DELETE_ADDRESS_REQUEST,
  loadingLine: true
}

const deleteAddressSuccess = {
  type: DELETE_ADDRESS_SUCCESS,
  loadingLine: false
}

const deleteAddressFailure = ({ message, error }) => ({
  type: DELETE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
})
