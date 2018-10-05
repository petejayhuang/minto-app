import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../actions/user'

import PasswordInput from '../../components/PasswordInput'
import TextInput from '../../components/TextInput'

import Button from '../../components/Button'

class EmailLoginButton extends Component {
  state = {
    first_name: this.props.user.first_name || '',
    last_name: this.props.user.last_name || '',
    username: this.props.user.username || '',
    profile_URL: this.props.user.profile_URL || '',
    email: this.props.user.email || '',
    password: ''
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleClick = () => this.setState({ showForm: true })

  handleLogin = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.authenticate({ method: 'email', email, password })
  }

  renderCreateAccountForm = () => {
    const { first_name, last_name, username, email, password } = this.state

    const {
      ui: { loadingLine }
    } = this.props

    return (
      <form className="d-flex flex-column align-items-center mt-3">
        <TextInput
          handleChange={this.handleInputChange}
          label="First Name"
          name="first_name"
          placeholder="e.g. Peter"
          ƒ
          required
          value={first_name}
        />

        <TextInput
          handleChange={this.handleInputChange}
          label="Last Name"
          name="last_name"
          required
          placeholder="e.g. Huang"
          value={last_name}
        />

        <TextInput
          handleChange={this.handleInputChange}
          label="Username"
          name="username"
          placeholder="e.g. Shoreditch Jewels"
          required
          value={username}
        />

        <TextInput
          handleChange={this.handleInputChange}
          label="Email"
          name="email"
          placeholder="e.g. team@minto.app"
          required
          value={email}
        />

        <PasswordInput handleChange={this.handleInputChange} value={password} />

        <Button
          handleSubmit={this.handleSubmit}
          className="mt-2 mb-5"
          text="Create account"
          submit
          loading={loadingLine}
        />
      </form>
    )
  }

  render() {
    const {
      className,
      ui: { loadingLine }
    } = this.props

    return (
      <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
        {this.renderCreateAccountForm()}
      </div>
    )
  }
}

export default connect(
  ({ ui, user }) => ({ ui, user }),
  { authenticate }
)(EmailLoginButton)
