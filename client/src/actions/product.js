import axios from "axios"
import { URLS } from "../config/constants"
import moment from "moment"
import { redirect } from "./ui"

// products/product
//

import {
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_STORE_PRODUCTS_REQUEST,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_FAILURE,
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAILURE
} from "./types"

// =====================================================
// ===========     GET PRODUCT CATEORIES     ===========
// =====================================================

export const getProductCategories = id => async dispatch => {
  dispatch(getProductCategoriesRequest)

  try {
    const { data } = await axios(`${URLS.SERVER}/categories`)
    dispatch(getProductCategoriesSuccess(data.data))
  } catch (error) {
    dispatch(
      getProductCategoriesFailure({
        message: "Could not get product categories.",
        error
      })
    )
  }
}

const getProductCategoriesRequest = {
  type: GET_PRODUCT_CATEGORIES_REQUEST,
  loadingLine: true
}

const getProductCategoriesSuccess = categories => ({
  type: GET_PRODUCT_CATEGORIES_SUCCESS,
  loadingLine: false,
  payload: categories
})

const getProductCategoriesFailure = ({ message, error }) => ({
  type: GET_PRODUCT_CATEGORIES_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============      GET PRODUCT     ================
// =====================================================

export const getProduct = id => async dispatch => {
  dispatch(getProductRequest)
  try {
    const { data } = await axios(`${URLS.SERVER}/products/${id}`)
    dispatch(getProductSuccess(data.data[0]))
  } catch (error) {
    dispatch(
      getProductFailure({
        message: "Could not get product.",
        error
      })
    )
  }
}

const getProductRequest = {
  type: GET_PRODUCT_REQUEST,
  loadingLine: true
}

const getProductSuccess = product => ({
  type: GET_PRODUCT_SUCCESS,
  loadingLine: false,
  payload: product
})

const getProductFailure = ({ message, error }) => ({
  type: GET_PRODUCT_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===========      GET STORE PRODUCTS     =============
// =====================================================

export const getStoreProducts = ({
  page,
  limit,
  user_id
}) => async dispatch => {
  dispatch(getStoreProductsRequest)
  try {
    console.log("page, limit, user_id", page, limit, user_id)
    const { data } = await axios(
      `${URLS.SERVER}/products?page=${page}&limit=${limit}&user_id=${user_id}`
    )
    dispatch(getStoreProductsSuccess(data))
    console.log("store data", data)
  } catch (error) {
    dispatch(
      getStoreProductsFailure({
        message: "Could not get store products.",
        error
      })
    )
  }
}

const getStoreProductsRequest = {
  type: GET_STORE_PRODUCTS_REQUEST,
  loadingLine: true
}

const getStoreProductsSuccess = storeProducts => ({
  type: GET_STORE_PRODUCTS_SUCCESS,
  loadingLine: false,
  payload: storeProducts
})

const getStoreProductsFailure = ({ message, error }) => ({
  type: GET_STORE_PRODUCTS_FAILURE,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ===============     UPLOAD TO S3     ================
// =====================================================

const uploadToS3UsingSignedUrlPromise = ({ url, image }) =>
  new Promise(async (resolve, reject) => {
    try {
      const request = await axios.put(url, image, {
        headers: { "Content-Type": image.type }
      })
      resolve(request)
    } catch (e) {
      reject(e)
    }
  })

export const uploadImagesToS3 = ({ images, form }) => async (
  dispatch,
  getState
) => {
  dispatch(uploadImagesToS3Request)

  // const {
  //   user: { id }
  // } = getState()

  const id = 1

  // Take array of image objects, and return array of file names
  const imagesNamesArray = images.map(current => current.name)

  try {
    // BE will return an array of uploadConfigs
    const uploadConfigs = await axios.post(`${URLS.SERVER}/uploads`, {
      user_id: id,
      images: imagesNamesArray
    })

    const arrayOfUploadToS3Promises = uploadConfigs.data.map(uploadConfig => {
      const { imageName, key, url } = uploadConfig
      const image = images.find(image => image.name === imageName)

      return uploadToS3UsingSignedUrlPromise({
        imageName: imageName,
        key: key,
        url: url,
        image
      })
    })

    Promise.all(arrayOfUploadToS3Promises).then(values => {
      dispatch(uploadImagesToS3Success(values))

      const images = values.map(image => {
        const tempObj = {}
        tempObj.image_URL = image.config.url.split("?")[0]
        tempObj.image_description = "placeholder image description"
        tempObj.image_date = moment().format()
        return tempObj
      })

      dispatch(uploadProduct({ images, ...form, user_id: id }))
    })
  } catch (error) {
    dispatch(
      uploadImagesToS3Failure({
        message: "Could not upload image.",
        error
      })
    )
  }
}

const uploadImagesToS3Request = {
  type: UPLOAD_TO_S3_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage:
    "Uploading your product, please don't refresh the page!"
}
const uploadImagesToS3Success = response => ({
  type: UPLOAD_TO_S3_SUCCESS,
  loadingOverlay: false,
  payload: response
})
const uploadImagesToS3Failure = ({ message, error }) => ({
  type: UPLOAD_TO_S3_FAILURE,
  loadingOverlay: false,
  error: { message, error }
})

// =====================================================
// ==============     UPLOAD PRODUCT     ===============
// =====================================================
export const uploadProduct = body => async dispatch => {
  body.currency_id = "GBP"
  body.user_id = 1

  dispatch(uploadProductRequest)

  try {
    const { data } = await axios.post(`${URLS.SERVER}/products/create`, body)
    // await dispatch(uploadProductSuccess(fakeProduct))
    console.log("data from /create", data)
    // console.log()
    dispatch(redirect(`/product`))
  } catch (error) {
    dispatch(
      uploadProductFailure({ message: "Could not upload product.", error })
    )
  }
}

const uploadProductRequest = {
  type: UPLOAD_PRODUCT_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage:
    "Uploading your product, please don't refresh the page!"
}

const uploadProductSuccess = product => ({
  type: UPLOAD_PRODUCT_SUCCESS,
  loadingOverlay: false,
  payload: product
})

const uploadProductFailure = ({ message, error }) => ({
  type: UPLOAD_PRODUCT_FAILURE,
  loadingOverlay: false,
  error: { message, error }
})
