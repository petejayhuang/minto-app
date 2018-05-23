// TODO:
// extract signedURL into it's own async function?
// better naming convention
// add stuff to redux?
// on successful POST to add product, redirect to new page?
// actions that demonstrate loading

import axios from 'axios'

import {
  UPLOAD_TO_S3_REQUEST,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE
} from './types'

const uploadWithSignedUrlPromise = ({ imageName, key, url, image }) => {
  console.log('FE uploadWithSignedUrlPromise')
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.put(url, image, {
        headers: { 'Content-Type': image.type }
      })
      resolve(request)
    } catch (e) {
      console.log('e in uploadWithSignedUrlPromise', e)
      reject(e)
    }
  })
}

export const uploadImagesToS3 = ({ images, productName }) => async dispatch => {
  dispatch(uploadImagesToS3Request)
  console.log(images)

  const imagesNamesArray = images.map(current => {
    return current.name
  })

  console.log('FE imagesNamesArray', imagesNamesArray)

  try {
    const uploadConfigs = await axios.post('/api/upload', {
      images: imagesNamesArray
    })
    console.log('FE uploadConfigs', uploadConfigs.data)

    const arrayOfPromises = uploadConfigs.data.map(uploadConfig => {
      const image = images.find(image => {
        return image.name === uploadConfig.imageName
      })

      console.log('fe arrayOfPromises image', image)

      return uploadWithSignedUrlPromise({
        imageName: uploadConfig.imageName,
        key: uploadConfig.key,
        url: uploadConfig.url,
        image
      })
    })

    console.log('FE arrayOfPromises', arrayOfPromises)

    Promise.all(arrayOfPromises).then(values => {
      console.log('all images uploaded to s3, FE values:', values)
      // send all URLs to justin to attach to product
      // post body includes 'productName'
    })
  } catch (error) {
    console.log(error)
    dispatch(
      uploadImagesToS3Failure({
        errorMessage: 'Could not upload image.',
        error
      })
    )
  }
}

const uploadImagesToS3Request = {
  type: UPLOAD_TO_S3_REQUEST,
  loading: true
}

const uploadImagesToS3Success = response => ({
  type: UPLOAD_TO_S3_REQUEST,
  loading: false,
  payload: response
})

const uploadImagesToS3Failure = error => ({
  type: UPLOAD_TO_S3_FAILURE,
  loading: false,
  error
})
