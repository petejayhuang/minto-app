import React, { Component } from 'react'
import { connect } from 'react-redux'

class OrderConfirmation extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">{`Your order of product ${
        this.props.orderConfirmed.product_id
      } is confirmed!`}</div>
    )
  }
}

export default connect(
  ({ orderConfirmed }) => ({ orderConfirmed }),
  null
)(OrderConfirmation)
