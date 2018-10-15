import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { printSuccess, printError } from '../../actions'
import { URLS } from '../../config/constants'

import { TouchableRow } from '../../components/TouchableRow'

class SettingsList extends Component {
  navigate = to => {
    this.props.push(to)
  }

  resendVerificationEmail = async () => {
    const {
      user: { email },
      printSuccess
    } = this.props
    try {
      await axios.post(`${URLS.SERVER}/users/resend_verify_email`, { email })
      printSuccess('Check your inbox! New email verification email sent.')
    } catch (error) {
      printError({ message: 'Could not send new verification email.', error })
    }
  }

  render() {
    const { user } = this.props
    return (
      <div className="route-container">
        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/update-account')}
          text="Update profile"
        />

        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/likes')}
          text="Liked items"
        />

        <TouchableRow.InternalLink
          handleClick={() => this.navigate('/settings/addresses')}
          text="Addresses"
        />
        {!user.bank_account_number && (
          <TouchableRow.InternalLink
            handleClick={() => this.navigate('/settings/bank-details')}
            text="Bank Details"
          />
        )}
        <TouchableRow.InternalLink
          borderBottom
          handleClick={() => this.navigate('/settings/logout')}
          text="Log out"
        />

        <h4 className="mt-5 pl-3">Action required:</h4>

        <TouchableRow.InternalLink
          borderBottom
          handleClick={this.resendVerificationEmail}
          text="Resend email verification"
        />

        <div className="pl-3 mt-5 text-center">
          We'd love to hear your feedback about Minto app.{' '}
          <a className="highlighted" href="mailto:hello@minto.app">
            Email us
          </a>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  { push, printSuccess, printError }
)(SettingsList)
