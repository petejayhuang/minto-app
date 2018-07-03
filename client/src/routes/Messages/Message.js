import React, { Component } from 'react'
import { connect } from 'react-redux'

class Message extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        Message Message Message
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  null
)(Message)
