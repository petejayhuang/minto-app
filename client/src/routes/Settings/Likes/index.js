import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getProductLikes } from '../../../actions/likes'
import { redirect } from '../../../actions/ui'

import TouchableRow from '../../../components/TouchableRow'

class Likes extends Component {
  componentDidMount() {
    this.props.getProductLikes()
  }

  render() {
    // const { addresses } = this.props.user

    return (
      <div className="route-container">
        {this.props.likes.map(like => {
          const {
            Product: { description, product_id }
          } = like
          return (
            <TouchableRow text={description} to={`/products/${product_id}`} />
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ user, likes }) => ({ user, likes }),
  { getProductLikes, redirect }
)(Likes)
