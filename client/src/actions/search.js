import axios from '../config/axios'
import { URLS } from '../config/constants'

import {
  GET_INITIAL_SEARCH_RESULTS_REQUEST,
  GET_INITIAL_SEARCH_RESULTS_SUCCESS,
  GET_INITIAL_SEARCH_RESULTS_FAILURE,
  RESET_SEARCH_RESULTS
} from './types'

// =====================================================
// ===========      GET SEARCH RESULTS     =============
// =====================================================
export const getSearchResults = ({ queryString, page }) => async dispatch => {
  console.log('page', page)
  dispatch(getSearchResultsRequest)
  try {
    const { data } = await axios()(
      `${URLS.SERVER}/feeds${queryString && `?${queryString}`}`
    )
    dispatch(getSearchResultsSuccess({ searchResults: data.data, page }))
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
  type: GET_INITIAL_SEARCH_RESULTS_REQUEST,
  loadingLine: true
}

const getSearchResultsSuccess = ({ searchResults, page }) => ({
  type: GET_INITIAL_SEARCH_RESULTS_SUCCESS,
  loadingLine: false,
  page,
  payload: searchResults
})

const getSearchResultsFailure = ({ message, error }) => ({
  type: GET_INITIAL_SEARCH_RESULTS_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==========      RESET SEARCH RESULTS     ============
// =====================================================
export const resetSearchResults = () => ({
  type: RESET_SEARCH_RESULTS
})
