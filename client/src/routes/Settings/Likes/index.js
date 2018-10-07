import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getProductLikes } from '../../../actions/likes'
import { redirect } from '../../../actions/ui'
import { push } from 'react-router-redux'
import { TouchableRow } from '../../../components/TouchableRow'

class Likes extends Component {
  componentDidMount() {
    this.props.getProductLikes()
  }

  navigate = to => {
    this.props.push(to)
  }

  render() {
    // const { addresses } = this.props.user

    return (
      <div className="route-container">
        {this.props.likes.map(like => {
          const {
            product_id,
            Product: { description }
          } = like

          return (
            <TouchableRow.InternalLink
              text={description}
              handleClick={() => this.navigate(`/products/${product_id}`)}
            />
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ user, likes }) => ({ user, likes }),
  { getProductLikes, redirect, push }
)(Likes)
