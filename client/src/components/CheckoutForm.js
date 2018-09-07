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

class CheckoutForm extends Component {
  handlePay = () => {
    const { dispatch, stripe, buyProduct } = this.props
    dispatch(getStripeTokenRequest)
    stripe
      .createToken({ name: 'Jenny Rosen' })
      .then(({ token }) => {
        dispatch(getStripeTokenSuccess)
        console.log('Received Stripe token:', token)
        const product_id = 1
        buyProduct({
          token,
          product_id
        })
      })
      .catch(error => {
        dispatch(getStripeTokenFailure(error))
      })
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
