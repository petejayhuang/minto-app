import axios from '../config/axios'
import { URLS } from '../config/constants'

import {
  GET_SEARCH_RESULTS_REQUEST,
  GET_SEARCH_RESULTS_SUCCESS,
  GET_SEARCH_RESULTS_FAILURE,
  RESET_SEARCH_RESULTS
} from './types'

// =====================================================
// ===========      GET SEARCH RESULTS     =============
// =====================================================
export const getSearchResults = queryString => async dispatch => {
  dispatch(getSearchResultsRequest)
  try {
    const { data } = await axios()(
      `${URLS.SERVER}/feeds${queryString && `?${queryString}`}`
    )
    dispatch(getSearchResultsSuccess(data.data))
  } catch (error) {
    dispatch(
      getSearchResultsFailure({
        message: 'Could not get search results.',
        error
      })
    )
  }
}

const getSearchResultsRequest = {
  type: GET_SEARCH_RESULTS_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage: 'Loading search results...',
  loadingLine: true
}

const getSearchResultsSuccess = searchResults => ({
  type: GET_SEARCH_RESULTS_SUCCESS,
  loadingLine: false,
  payload: searchResults
})

const getSearchResultsFailure = ({ message, error }) => ({
  type: GET_SEARCH_RESULTS_FAILURE,
  loadingLine: false,
  loadingOverlayMessage: '',
  error: { message, error }
})

// =====================================================
// ==========      RESET SEARCH RESULTS     ============
// =====================================================
export const resetSearchResults = () => ({
  type: RESET_SEARCH_RESULTS
})
