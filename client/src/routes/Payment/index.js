import React, { Component } from "react"
import { Elements } from "react-stripe-elements"
import InjectedCheckoutForm from "./CheckoutForm"

class Payments extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    )
  }
}

Payments.defaultProps = {}
Payments.propTypes = {}

export default Payments
