import axios from "axios"
import moment from "moment"

import {
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE
} from "./types"

export const uploadToS3 = file => async dispatch => {
  dispatch(uploadToS3Request)

  try {
    const uploadConfig = await axios.get("/api/upload")
    console.log("uploadConfig", uploadConfig.data)

    // const request = await axios.put(uploadConfig.data.url, file, {
    //   headers: { "Content-Type": file.type }
    // })

    // console.log("request", request)
  } catch (error) {
    console.log(error)
    dispatch(
      uploadToS3Failure({ errorMessage: "Could not upload image.", error })
    )
  }
}

const uploadToS3Request = {
  type: UPLOAD_TO_S3_REQUEST,
  loading: true
}

const uploadToS3Success = response => ({
  type: UPLOAD_TO_S3_REQUEST,
  loading: false,
  payload: response
})

const uploadToS3Failure = error => ({
  type: UPLOAD_TO_S3_FAILURE,
  loading: false,
  error
})
