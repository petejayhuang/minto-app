import React, { Component } from 'react'
import { connect } from 'react-redux'

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateToLogin()
    }
    componentDidUpdate() {
      this.shouldNavigateToLogin()
    }

    shouldNavigateToLogin = () => {
      if (!this.props.user.id) {
        this.props.history.push('/')
      }
    }
    render() {
      return <ChildComponent {...this.props} />
    }
  }

  return connect(
    ({ user }) => ({ user }),
    null
  )(ComposedComponent)
}
