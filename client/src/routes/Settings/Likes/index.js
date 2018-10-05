import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getLikes } from '../../../actions/likes'
import { redirect } from '../../../actions/ui'

import TouchableMenu from '../../../components/TouchableMenu'

class Likes extends Component {
  componentDidMount() {
    this.props.getLikes()
  }

  render() {
    // const { addresses } = this.props.user

    return <div className="route-container">this is the likes page</div>
  }
}

export default connect(
  ({ user }) => ({ user }),
  { getLikes, redirect }
)(Likes)
