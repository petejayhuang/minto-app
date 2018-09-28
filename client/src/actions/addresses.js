import axios from "../config/axios";

import { URLS } from "../config/constants";

import {
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
} from "./types";

// =====================================================
// ==============      GET ADDRESSES     ===============
// =====================================================
export const getAddresses = () => async dispatch => {
  dispatch(getAddressesRequest);
  try {
    const { data } = await axios().get("/addresses");
    console.log("data", data);
    dispatch(getAddressesSuccess(data.data));
  } catch (error) {
    dispatch(
      getAddressesFailure({
        message: "Could not get addresses.",
        error
      })
    );
  }
};

const getAddressesRequest = {
  type: GET_ADDRESSES_REQUEST,
  loadingLine: true
};

const getAddressesSuccess = addresses => ({
  type: GET_ADDRESSES_SUCCESS,
  loadingLine: false,
  payload: addresses
});

const getAddressesFailure = ({ message, error }) => ({
  type: GET_ADDRESSES_FAILURE,
  loadingLine: false,
  error: { message, error }
});

// =====================================================
// ===============    CREATE ADDRESS     ===============
// =====================================================
export const createAddress = (body, callback) => async dispatch => {
  dispatch(createAddressRequest);
  console.log("body", body);
  try {
    const { data } = await axios().post("/addresses", body);
    dispatch(createAddressSuccess(data.data));
    callback();
  } catch (error) {
    dispatch(
      createAddressFailure({
        message: "Could not get addresses.",
        error
      })
    );
  }
};

const createAddressRequest = {
  type: CREATE_ADDRESS_REQUEST,
  loadingLine: true
};

const createAddressSuccess = addresses => ({
  type: CREATE_ADDRESS_SUCCESS,
  loadingLine: false,
  payload: addresses
});

const createAddressFailure = ({ message, error }) => ({
  type: CREATE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
});

// =====================================================
// ==============      TODO UPDATE ADDRESS     ==============
// =====================================================
export const updateAddress = () => async dispatch => {
  dispatch(updateAddressRequest);
  try {
    const { data } = await axios()(`${URLS.SERVER}/addresses`);
    dispatch(updateAddressSuccess(data.data));
  } catch (error) {
    dispatch(
      updateAddressFailure({
        message: "Could not get addresses.",
        error
      })
    );
  }
};

const updateAddressRequest = {
  type: UPDATE_ADDRESS_REQUEST,
  loadingLine: true
};

const updateAddressSuccess = addresses => ({
  type: UPDATE_ADDRESS_SUCCESS,
  loadingLine: false,
  payload: addresses
});

const updateAddressFailure = ({ message, error }) => ({
  type: UPDATE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
});

// =====================================================
// ==============      TODO DELETE ADDRESS     ==============
// =====================================================
export const deleteAddress = () => async dispatch => {
  dispatch(deleteAddressRequest);
  try {
    const { data } = await axios()(`${URLS.SERVER}/addresses`);
    dispatch(deleteAddressSuccess(data.data));
  } catch (error) {
    dispatch(
      deleteAddressFailure({
        message: "Could not get addresses.",
        error
      })
    );
  }
};

const deleteAddressRequest = {
  type: DELETE_ADDRESS_REQUEST,
  loadingLine: true
};

const deleteAddressSuccess = addresses => ({
  type: DELETE_ADDRESS_SUCCESS,
  loadingLine: false,
  payload: addresses
});

const deleteAddressFailure = ({ message, error }) => ({
  type: DELETE_ADDRESS_FAILURE,
  loadingLine: false,
  error: { message, error }
});
