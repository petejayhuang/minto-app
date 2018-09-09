import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../actions/user'

import Button from '../Button'

class EmailLoginButton extends Component {
  state = {
    showForm: false,
    email: '',
    password: ''
  }

  handleInputChange = (inputName, e) => {
    this.setState({ [inputName]: e.target.value })
  }

  handleClick = () => {
    this.setState({ showForm: true })
  }

  handleLogin = () => {
    const { email, password } = this.state
    console.log('email, password', email, password)
    this.props.authenticate({ method: 'email', email, password })
  }

  renderLoginForm = () => {
    const { email, password } = this.state
    const {
      ui: { loadingLine }
    } = this.props
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <label>Email</label>

        <input
          onChange={e => this.handleInputChange('email', e)}
          type="text"
          value={email}
          placeholder="e.g. team@minto.app"
        />
        <label className="mt-2">Password</label>
        <input
          onChange={e => this.handleInputChange('password', e)}
          type="password"
          value={password}
        />

        <Button
          handleClick={this.handleLogin}
          className="mt-2 mb-5"
          text="Login with Email"
          loading={loadingLine}
        />
      </div>
    )
  }

  render() {
    const {
      className,
      ui: { loadingLine }
    } = this.props

    const { showForm } = this.state
    return (
      <div>
        {!showForm ? (
          <Button
            onClick={this.handleClick}
            className={className}
            loading={loadingLine}
            text="Email"
          />
        ) : (
          this.renderLoginForm()
        )}
      </div>
    )
  }
}

export default connect(
  ({ ui }) => ({ ui }),
  { authenticate }
)(EmailLoginButton)
