import React, { Component } from 'react'
import { connect } from 'react-redux'

class Likes extends Component {
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        Likes Likes Likes Likes Likes
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  null
)(Likes)
