import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddCard extends Component {
  componentDidMount() {}
  render() {
    return <div className="route-container pl-3 pr-3">a form</div>
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  {}
)(AddCard)
