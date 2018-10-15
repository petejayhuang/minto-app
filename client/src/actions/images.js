import axios from '../config/axios'
import { URLS } from '../config/constants'

import {
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE
} from './types'

// =====================================================
// ===============     UPLOAD TO S3     ================
// =====================================================
const uploadToS3UsingSignedUrlPromise = ({ url, image }) =>
  new Promise(async (resolve, reject) => {
    try {
      const request = await axios().put(url, image, {
        headers: { 'Content-Type': image.type }
      })
      resolve(request)
    } catch (e) {
      reject(e)
    }
  })

export const uploadImagesToS3 = (
  { images, upload_type },
  callback
) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(uploadImagesToS3Request)

    // Take array of image objects, and return array of file names
    const imagesNamesArray = images.map(current => current.name)

    const body = {
      upload_type,
      images: imagesNamesArray
    }

    if (upload_type === 'document') {
      body.document_type = 'national_id'
    }

    try {
      // BE will return an array of uploadConfigs
      const uploadConfigs = await axios().post(`${URLS.SERVER}/uploads`, body)

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
        const images = values.map(image => ({
          image_URL: image.config.url.split('?')[0],
          image_description: 'placeholder image description'
        }))
        if (callback) {
          callback(images)
        }
        return resolve(images)
      })
    } catch (error) {
      dispatch(
        uploadImagesToS3Failure({
          message: 'Could not upload image.',
          error
        })
      )
      return reject('Could not upload image.')
    }
  })

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
