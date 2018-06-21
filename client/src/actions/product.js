import _ from "lodash"
import axios from "axios"
import { URLS } from "../config/constants"
import moment from "moment"
import { redirect } from "./ui"

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
  UPLOAD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE
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
    const { data } = await axios(
      `${URLS.SERVER}/products?page=${page}&limit=${limit}&user_id=${user_id}`
    )
    dispatch(getStoreProductsSuccess(data.data))
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

export const uploadImagesToS3 = ({ images, form }) => async dispatch => {
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
    "Uploading your product, please don't refresh the page!",
  loadingLine: false
}
const uploadImagesToS3Success = response => ({
  type: UPLOAD_TO_S3_SUCCESS,
  loadingOverlay: false,
  loadingLine: false,
  payload: response
})
const uploadImagesToS3Failure = ({ message, error }) => ({
  type: UPLOAD_TO_S3_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
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
    dispatch(uploadProductSuccess())
    dispatch(redirect(`/product/${data.data.id}`))
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
    "Uploading your product, please don't refresh the page!",
  loadingLine: false
}

const uploadProductSuccess = () => ({
  type: UPLOAD_PRODUCT_SUCCESS,
  loadingOverlay: false,
  loadingLine: false
})

const uploadProductFailure = ({ message, error }) => ({
  type: UPLOAD_PRODUCT_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
  error: { message, error }
})

// =====================================================
// ==============     UPDATE PRODUCT     ===============
// =====================================================

// notes
// when a field isn't touched, state initial values are passed to this call
export const updateProduct = body => async (dispatch, getState) => {
  const { product_id } = getState().product

  _.pickBy(body, true)

  // const updateBody = _.pick(product, [
  //   "category_id",
  //   "description",
  //   "meet_in_person_YN",
  //   "price",
  //   "product_id",
  //   "shipping_YN",
  //   "user_id"
  // ])

  console.log("body in update project", body)
  // updateBody.currency_id = "GBP"
  // updateBody.user_id = 1

  // return Object.keys(data).reduce((accumulator, currentItem) => {
  //   if (data[currentItem]) {
  //     accumulator[currentItem] = data[currentItem]
  //   }
  //   return accumulator
  // }, {})

  dispatch(updateProductRequest)

  try {
    console.log("update product body", body)
    const { data } = await axios.put(`${URLS.SERVER}/products`, body)
    dispatch(updateProductSuccess())
    // dispatch(redirect(`/product/${data.data.id}`))
  } catch (error) {
    dispatch(
      updateProductFailure({ message: "Could not update product.", error })
    )
  }
}

const updateProductRequest = {
  type: UPLOAD_PRODUCT_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage:
    "Updating your product, please don't refresh the page!",
  loadingLine: false
}

const updateProductSuccess = () => ({
  type: UPLOAD_PRODUCT_SUCCESS,
  loadingOverlay: false,
  loadingLine: false
})

const updateProductFailure = ({ message, error }) => ({
  type: UPLOAD_PRODUCT_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
  error: { message, error }
})
// =====================================================
// ==============     DELETE PRODUCT     ===============
// =====================================================

export const deleteProduct = id => async (dispatch, getState) => {
  dispatch(deleteProductRequest)
  const body = {
    product_id: id,
    user_id: getState().user.id
  }
  try {
    console.log("body in delete", body)
    const { data } = await axios.delete(`${URLS.SERVER}/products`, body)
    dispatch(deleteProductSuccess(data))
    dispatch(redirect("/feed"))
  } catch (error) {
    dispatch(
      deleteProductFailure({ message: "Could not delete product.", error })
    )
  }
}

const deleteProductRequest = {
  type: DELETE_PRODUCT_REQUEST,
  loadingOverlay: true,
  loadingOverlayMessage:
    "Deleting your product, please don't refresh the page!",
  loadingLine: true
}

const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
  success: "Product successfully deleted.",
  loadingOverlay: false,
  loadingLine: false
})

const deleteProductFailure = ({ message, error }) => ({
  type: DELETE_PRODUCT_FAILURE,
  loadingOverlay: false,
  loadingLine: false,
  error: { message, error }
})
