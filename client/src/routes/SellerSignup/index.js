import React, { Component } from 'react'
import { connect } from 'react-redux'

class SellerSignup extends Component {
  state = {}

  render() {
    return (
      <div className="route-container p-3">
        Sign up as a seller by emailing us! TODO: what should we add here?
      </div>
    )
  }
}

export default connect(
  ({}) => ({}),
  {}
)(SellerSignup)
