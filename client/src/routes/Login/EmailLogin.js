import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../actions/user'

import Button from '../../components/Button'
import PasswordInput from '../../components/PasswordInput'
import TextInput from '../../components/TextInput'

class EmailLoginButton extends Component {
  state = {
    showForm: false,
    email: '',
    password: ''
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleClick = () => this.setState({ showForm: true })

  handleLogin = () => {
    const { email, password } = this.state
    this.props.authenticate({ method: 'email', email, password })
  }

  renderLoginForm = () => {
    const { email, password } = this.state
    const {
      ui: { loadingLine }
    } = this.props
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <TextInput
          label="Email"
          handleChange={this.handleInputChange}
          name="email"
          placeholder="e.g. team@minto.app"
          value={email}
        />

        <PasswordInput handleChange={this.handleInputChange} value={password} />

        <Button
          handleClick={this.handleLogin}
          className="mt-2"
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
            text="Login with Email"
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
