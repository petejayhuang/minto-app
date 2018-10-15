import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { connect } from 'react-redux'
import { URLS } from '../../config/constants'

import { printError, printSuccess, redirect } from '../../actions'

import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE
} from '../../actions/types'

class VerifyEmail extends Component {
  state = {
    email: '',
    email_verified: null,
    token: null
  }

  async componentDidMount() {
    const token = this.props.match.params.token
    const { dispatch, printSuccess, printError } = this.props

    dispatch({ type: VERIFY_EMAIL_REQUEST, loadingLine: true })

    try {
      await axios.get(`${URLS.SERVER}/users/verify_email/${token}`)
      this.setState({ email_verified: true })
      dispatch({ type: VERIFY_EMAIL_SUCCESS, loadingLine: false })
      printSuccess('Email successfully verified')
    } catch (error) {
      this.setState({ email_verified: false, token })
      dispatch({ type: VERIFY_EMAIL_FAILURE, loadingLine: false, error })
      printError({ message: 'Could not verify email.' })
    }
  }

  handleSubmit = async () => {
    const { dispatch } = this.props
    const { email } = this.state
    try {
      await axios.post(`${URLS.SERVER}/users/resend_verify_email`, {
        email
      })
      dispatch(
        printSuccess('Check your inbox! New email verification email sent.')
      )
      dispatch(redirect('/feed'))
    } catch (error) {
      dispatch(
        printError({ message: 'Could not send new verification email.', error })
      )
    }
  }

  handleInputChange = e => this.setState({ email: e.target.value })

  renderErrorUI = () => {
    const {
      ui: { loadingLine }
    } = this.props
    const { email } = this.state
    return (
      <Fragment>
        <h1>That didn't work...</h1>
        <div className="mt-3">
          <form
            onSubmit={this.handleSubmit}
            className="d-flex flex-column align-items-center"
          >
            <TextInput
              handleChange={this.handleInputChange}
              label="Email"
              name="email"
              placeholder="e.g. team@minto.app"
              required
              type="email"
              value={email}
            />

            <Button
              submit
              className="mb-2"
              text=" Resend verification email"
              loading={loadingLine}
            />
          </form>
          <a className="highlighted" href="mailto:hello@minto.app">
            Email our developers
          </a>
          , and we'll sort it out.
          <p className="text-center mt-3">
            Or go back to the{' '}
            <a className="highlighted" href="/feed">
              feed
            </a>
            .
          </p>
        </div>
      </Fragment>
    )
  }

  render() {
    const { email_verified } = this.state
    return (
      <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
        {email_verified === null && 'Verifying email...'}
        {email_verified === false && this.renderErrorUI()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ printError, printSuccess, redirect }, dispatch)
})

export default connect(
  ({ ui }) => ({ ui }),
  mapDispatchToProps
)(VerifyEmail)
