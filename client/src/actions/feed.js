import axios from '../config/axios'
import { URLS } from '../config/constants'

import { GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE } from './types'

// =====================================================
// ================      GET FEED     ==================
// =====================================================
export const getFeed = ({ page, limit }) => async dispatch => {
  dispatch(getFeedRequest)
  try {
    const { data } = await axios()(
      `${URLS.SERVER}/feeds?page=${page}&limit=${limit}`
    )
    dispatch(getFeedSuccess(data.data))
  } catch (error) {
    dispatch(
      getFeedFailure({
        message: 'Could not get feed.',
        error
      })
    )
  }
}

const getFeedRequest = {
  type: GET_FEED_REQUEST,
  loadingLine: true
}

const getFeedSuccess = feed => ({
  type: GET_FEED_SUCCESS,
  loadingLine: false,
  payload: feed
})

const getFeedFailure = ({ message, error }) => ({
  type: GET_FEED_FAILURE,
  loadingLine: false,
  error: { message, error }
})
