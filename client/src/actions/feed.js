import axios from '../config/axios'
import { URLS } from '../config/constants'

import {
  GET_INITIAL_FEED_REQUEST,
  GET_INITIAL_FEED_SUCCESS,
  GET_INITIAL_FEED_FAILURE
} from './types'

// =====================================================
// ================      GET FEED     ==================
// =====================================================
export const getFeed = ({ page, limit }) => async dispatch => {
  dispatch(getFeedRequest)

  try {
    const { data } = await axios()(
      `${URLS.SERVER}/feeds?page=${page}&limit=${limit}`
    )

    console.log(data.feed)

    dispatch(getFeedSuccess({ feed: data.feed, page }))
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
  type: GET_INITIAL_FEED_REQUEST,
  loadingLine: true
}

const getFeedSuccess = ({ feed, page }) => ({
  type: GET_INITIAL_FEED_SUCCESS,
  loadingLine: false,
  payload: feed,
  page
})

const getFeedFailure = ({ message, error }) => ({
  type: GET_INITIAL_FEED_FAILURE,
  loadingLine: false,
  error: { message, error }
})
