import React, { Component } from 'react'
import { connect } from 'react-redux'
import TouchableRow from '../../../components/TouchableRow'

class PaymentDetails extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <div className="route-container pl-3 pr-3">
          <ul>
            <li>Card 1</li>
            <li>Card 2</li>
            <li>Card 3</li>
            <li>Card 4</li>
          </ul>
        </div>

        <TouchableRow
          borderBottom
          to="/settings/add-card"
          text="Add payment card"
        />
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  {}
)(PaymentDetails)
