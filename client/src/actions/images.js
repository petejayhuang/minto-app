// TODO:
// extract signedURL into it's own async function?
// better naming convention
// add stuff to redux?
// on successful POST to add product, redirect to new page?
// actions that demonstrate loading

import axios from "axios"

import {
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE
} from "./types"

const uploadToS3UsingSignedUrlPromise = ({ imageName, key, url, image }) =>
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

export const uploadImagesToS3 = ({ images, productName }) => async (
  dispatch,
  getState
) => {
  dispatch(uploadImagesToS3Request)
  const { user } = getState()

  // Take array of image objects, and return array of file names
  const imagesNamesArray = images.map(current => current.name)

  try {
    // BE will return an array of uploadConfigs
    const uploadConfigs = await axios.post("/api/upload", {
      images: imagesNamesArray
    })

    //
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

    const { id, username } = user

    Promise.all(arrayOfUploadToS3Promises).then(values => {
      dispatch(uploadImagesToS3Success(values))
      // req to justin BE
    })
  } catch (e) {
    dispatch(
      uploadImagesToS3Failure({
        message: "Could not upload image.",
        log: e
      })
    )
  }
}

const uploadImagesToS3Request = {
  type: UPLOAD_TO_S3_REQUEST,
  loadingOverlay: true
}

const uploadImagesToS3Success = response => ({
  type: UPLOAD_TO_S3_SUCCESS,
  loadingOverlay: false,
  payload: response
})

const uploadImagesToS3Failure = error => ({
  type: UPLOAD_TO_S3_FAILURE,
  loadingOverlay: false,
  error
})
