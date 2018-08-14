import React, { Component } from 'react'
import { connect } from 'react-redux'
import { redirect } from '../actions'
import { Redirect } from 'react-router'

class StoreDrivenRedirect extends Component {
  componentDidMount() {
    this.props.redirect('')
  }
  render() {
    return <Redirect to={this.props.ui.redirect} />
  }
}

const mapState = ({ ui }) => ({ ui })

export default connect(
  mapState,
  { redirect }
)(StoreDrivenRedirect)
