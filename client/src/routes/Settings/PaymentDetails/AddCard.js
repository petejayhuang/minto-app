import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../../../actions'

class AddCard extends Component {
  state = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

  handleChange = (inputType, value) => {
    this.setState({ [inputType]: value })
  }

  handleButton = () => {
    const { cardNumber, expiryMonth, expiryYear, cvc } = this.state
    this.props.addCard({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc
    })
  }

  render() {
    return (
      <div className="route-container pl-3 pr-3">
        <div className="d-flex flex-column">
          <label>Card Number</label>
          <input
            type="text"
            onChange={e => this.handleChange('cardNumber', e.target.value)}
            value={this.state.cardNumber}
          />
        </div>
        <div className="d-flex flex-column">
          <label>Card Expiry (Month)</label>
          <input
            type="text"
            onChange={e => this.handleChange('expiryMonth', e.target.value)}
            value={this.state.expiryMonth}
          />
        </div>
        <div className="d-flex flex-column">
          <label>Card Expiry (Year)</label>
          <input
            type="text"
            onChange={e => this.handleChange('expiryYear', e.target.value)}
            value={this.state.expiryYear}
          />
        </div>
        <div className="d-flex flex-column">
          <label>Card CVC</label>
          <input
            type="text"
            onChange={e => this.handleChange('cvc', e.target.value)}
            value={this.state.cvc}
          />
        </div>
        <button onClick={this.handleButton}>Add New Card</button>
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  { addCard }
)(AddCard)
