import React, { Component } from 'react'
import { connect } from 'react-redux'

class Reviews extends Component {
  render() {
    return (
      <div>
        <div className="route-container pl-3 pr-3">REVIEWS!</div>
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  {}
)(Reviews)
