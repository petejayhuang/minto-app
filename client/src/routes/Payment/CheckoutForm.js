import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { injectStripe } from "react-stripe-elements"
import {
  createStripeTokenRequest,
  createStripeTokenSuccess,
  createStripeTokenFailure,
  createCharge
} from "../../actions/payment"

import CardSection from "./CardSection"

class CheckoutForm extends Component {
  state = { error: "" }
  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(createStripeTokenRequest)
    this.props.stripe
      .createToken({ type: "card" })
      .then(response => {
        this.props.dispatch(createStripeTokenSuccess)
        this.props.createCharge({
          card_id: response.token.id,
          amount: 123456,
          description: "Test charge",
          email: this.props.user.email
        })
      })
      .catch(error => {
        this.setState({ error: "Could not verify card" })
        this.props.dispatch(
          createStripeTokenFailure({
            message: "Could not create stripe token",
            error
          })
        )
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="d-flex flex-column">
          <CardSection />
          <button>Confirm order</button>
        </form>
        <div>{this.state.error}</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      createCharge
    },
    dispatch
  )
})

export default connect(
  ({ user }) => ({ user }),
  mapDispatchToProps
)(injectStripe(CheckoutForm))
