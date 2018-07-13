import axios from '../utilities/axios'
import { URLS } from '../config/constants'

import {
  GET_MESSAGE_THREADS_REQUEST,
  GET_MESSAGE_THREADS_SUCCESS,
  GET_MESSAGE_THREADS_FAILURE,
  GET_MESSAGE_THREAD_REQUEST,
  GET_MESSAGE_THREAD_SUCCESS,
  GET_MESSAGE_THREAD_FAILURE,
  CREATE_MESSAGE_THREAD_REQUEST,
  CREATE_MESSAGE_THREAD_SUCCESS,
  CREATE_MESSAGE_THREAD_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE
} from './types'

// =====================================================
// ==========      CREATE MESSAGE THREAD     ===========
// =====================================================
export const createMessageThread = ({
  participant_id,
  product_id
}) => async dispatch => {
  dispatch(createMessageThreadRequest)
  try {
    const { data } = await axios().post(`${URLS.SERVER}/threads`, {
      name: `Best Group`,
      participant_id,
      product_id
    })
    dispatch(createMessageThreadSuccess(data.data))
  } catch (error) {
    dispatch(
      createMessageThreadFailure({
        message: 'Could not get message threads.',
        error
      })
    )
  }
}
const createMessageThreadRequest = {
  type: CREATE_MESSAGE_THREAD_REQUEST,
  loadingLine: true
}
const createMessageThreadSuccess = storeProducts => ({
  type: CREATE_MESSAGE_THREAD_SUCCESS,
  loadingLine: false,
  payload: storeProducts
})
const createMessageThreadFailure = ({ message, error }) => ({
  type: CREATE_MESSAGE_THREAD_FAILURE,
  loadingLine: false,
  error: { message, error }
})
// =====================================================
// ===========      GET MESSAGE THREADS    =============
// =====================================================
export const getMessageThreads = () => async dispatch => {
  dispatch(getMessageThreadsRequest)
  try {
    const { data } = await axios()(`${URLS.SERVER}/threads`)
    dispatch(getMessageThreadsSuccess(data.data))
  } catch (error) {
    dispatch(
      getMessageThreadsFailure({
        message: 'Could not get message threads.',
        error
      })
    )
  }
}
const getMessageThreadsRequest = {
  type: GET_MESSAGE_THREADS_REQUEST,
  loadingLine: true
}

const getMessageThreadsSuccess = storeProducts => ({
  type: GET_MESSAGE_THREADS_SUCCESS,
  loadingLine: false,
  payload: storeProducts
})

const getMessageThreadsFailure = ({ message, error }) => ({
  type: GET_MESSAGE_THREADS_FAILURE,
  loadingLine: false,
  error: { message, error }
})
// =====================================================
// ==========      GET A MESSAGE THREAD    =============
// =====================================================
export const getMessageThread = thread_id => async dispatch => {
  dispatch(getMessageThreadRequest)
  try {
    const { data } = await axios()(`${URLS.SERVER}/messages/${thread_id}`)
    dispatch(getMessageThreadSuccess(data.data))
  } catch (error) {
    dispatch(
      getMessageThreadFailure({
        message: 'Could not get message thread.',
        error
      })
    )
  }
}
const getMessageThreadRequest = {
  type: GET_MESSAGE_THREAD_REQUEST,
  loadingLine: true
}

const getMessageThreadSuccess = storeProducts => ({
  type: GET_MESSAGE_THREAD_SUCCESS,
  loadingLine: false,
  payload: storeProducts
})

const getMessageThreadFailure = ({ message, error }) => ({
  type: GET_MESSAGE_THREAD_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============      CREATE MESSAGE     ==============
// =====================================================
export const createMessage = ({ body, thread_id }) => async dispatch => {
  dispatch(createMessageRequest)
  try {
    const { data } = await axios().post(`${URLS.SERVER}/messages`, {
      body,
      thread_id
    })
    dispatch(createMessageSuccess(data.data))
  } catch (error) {
    dispatch(
      createMessageFailure({
        message: 'Could not create message.',
        error
      })
    )
  }
}
const createMessageRequest = {
  type: CREATE_MESSAGE_REQUEST,
  loadingLine: true
}
const createMessageSuccess = storeProducts => ({
  type: CREATE_MESSAGE_SUCCESS,
  loadingLine: false,
  payload: storeProducts
})
const createMessageFailure = ({ message, error }) => ({
  type: CREATE_MESSAGE_FAILURE,
  loadingLine: false,
  error: { message, error }
})
