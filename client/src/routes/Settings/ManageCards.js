import React, { Component } from "react"
import { connect } from "react-redux"
import { getPaymentCards } from "../../actions"

class ManageCards extends Component {
  componentDidMount() {
    this.props.getPaymentCards()
  }
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        this page is for manageing accounts
      </div>
    )
  }
}

const mapState = ({ cards }) => ({ cards })

export default connect(
  mapState,
  { getPaymentCards }
)(ManageCards)
