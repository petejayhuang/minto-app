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
    if (this.props.product.product_id) {
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
            <CheckoutForm />
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
