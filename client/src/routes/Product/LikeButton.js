import React from 'react'
import { connect } from 'react-redux'
import {
  addProductLike,
  deleteProductLike,
  printError,
  printSuccess
} from '../../actions'

import HeartIcon from '../../assets/icons/feather-react/HeartIcon'

const LikeButton = ({
  addProductLike,
  callback,
  deleteProductLike,
  like_id,
  printError,
  printSuccess,
  product_id,
  user_id
}) => {
  const ifLoggedOutSendError = () => {
    if (!user_id) {
      return printError({
        message: 'Please log in to add to your liked items.',
        error: {}
      })
    }
  }
  const handleAddLike = () => {
    ifLoggedOutSendError()
    addProductLike(product_id)
    printSuccess('Liked added')
    callback()
  }

  const handleRemoveLike = () => {
    ifLoggedOutSendError()
    deleteProductLike(like_id)
    printError('Liked removed')
    callback()
  }

  return (
    <div onClick={like_id ? handleRemoveLike : handleAddLike}>
      <HeartIcon
        fill={like_id ? 'red' : 'white'}
        stroke={like_id ? 'red' : 'black'}
      />
      {` ${like_id ? 'Remove from' : 'Add to'}  liked list`}
    </div>
  )
}

export default connect(
  null,
  { addProductLike, deleteProductLike, printError, printSuccess }
)(LikeButton)
