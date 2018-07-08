import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShoppingCart extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        Shopping Cart Shopping Cart ShoppingCart
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  null
)(ShoppingCart)
