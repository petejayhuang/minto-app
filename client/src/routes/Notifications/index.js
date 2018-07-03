import React, { Component } from 'react'
import { connect } from 'react-redux'

class Notifications extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        Notifications Notifications Notifications
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  null
)(Notifications)
