import React, { Component } from "react"

class Payments extends Component {
  state = {
    cardNumber: null,
    expiryMonth: null,
    expiryYear: null,
    cvc: null
  }

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  render() {
    return (
      <div className="route-container pl-3 pr-3">
        <h2>Add a new card</h2>
        <div className="d-flex flex-column">
          <label>Card Number</label>
          <textarea
            onChange={e =>
              this.handleTextInputChange("cardNumber", e.target.value)
            }
            value={this.state.cardNumber}
          />
        </div>
      </div>
    )
  }
}

export default Payments
