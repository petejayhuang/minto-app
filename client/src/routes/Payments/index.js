import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { redirect, getProduct } from '../../actions'

import { Elements } from 'react-stripe-elements'
import CheckoutForm from '../../components/CheckoutForm'

class Landing extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    const productId = this.props.product.product_id
    if (productId) {
      const {
        product: { Images }
      } = this.props
      return (
        <div className="route-container p-3 ">
          <div>
            <img
              alt="product"
              className="img-fluid"
              src={Images[0].image_URL}
            />
          </div>
          <Elements>
            <CheckoutForm productId={productId} />
          </Elements>
        </div>
      )
    } else {
      return <div />
    }
  }
}
export default connect(
  ({ product }) => ({ product }),
  { getProduct, redirect }
)(withRouter(Landing))
