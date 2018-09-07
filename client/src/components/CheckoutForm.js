import React, { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements'

import {
  getStripeTokenRequest,
  getStripeTokenSuccess,
  getStripeTokenFailure,
  buyProduct
} from '../actions/payments'

import Button from './Button'
import { redirect } from '../actions';

class CheckoutForm extends Component {
  handlePay = async () => {
    const { dispatch, stripe, buyProduct } = this.props
    try {
      dispatch(getStripeTokenRequest)

      const { token } = await stripe.createToken()
      console.log('stripeToken:', token.id)
      dispatch(getStripeTokenSuccess)

      await buyProduct({
        stripeToken: token.id,
        product_id: this.props.productId
      })

      redirect('/order-confirmation')

    } catch (e) {
      dispatch(getStripeTokenFailure(e))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardNumberElement />
        <CardExpiryElement />
        <CardCVCElement />
        <Button
          loading={this.props.ui.loadingLine}
          text="Pay now"
          handleClick={this.handlePay}
        />
      </form>
    )
  }
}

const mapStateToProps = ({ ui }) => ({ ui })

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ buyProduct }, dispatch)
})

export default compose(
  injectStripe,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckoutForm)
