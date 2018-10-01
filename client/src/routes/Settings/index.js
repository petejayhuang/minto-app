import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { TouchableRow } from '../../components/TouchableRow'

class SettingsList extends Component {
  navigate = to => {
    this.props.push(to)
  }
  render() {
    return (
      <div className="route-container">
        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/update-account')}
          text="Update profile"
        />
        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/addresses')}
          text="Addresses"
        />
        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/bank-details')}
          text="Bank Details"
        />
        <TouchableRow.InternalLink
          borderBottom
          handleClick={() => this.navigate('/settings/logout')}
          text="Log out"
        />
        <div className="pl-3 mt-5 text-center">
          We'd love to hear your feedback.{' '}
          <a className="highlighted" href="mailto:hello@minto.app">
            Email us
          </a>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { push }
)(SettingsList)
