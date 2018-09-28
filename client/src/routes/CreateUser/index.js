// libs
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// actions, helpers
import {
  getUsernameAvailability,
  createUser,
  updateUser
} from '../../actions/user'
import { redirect } from '../../actions/ui'
import { DURATIONS } from '../../config/constants'

// components
import PasswordInput from '../../components/PasswordInput'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import FacebookAuth from '../Login/FacebookAuth'

const Container = styled.div`
  .error-text-container {
    max-width: 320px;
  }
`

class CreateUser extends Component {
  state = {
    email: this.props.user.email || '',
    first_name: this.props.user.first_name || '',
    last_name: this.props.user.last_name || '',
    password: '',
    profile_URL: this.props.user.profile_URL || '',
    showEmailSignup: false,
    username: this.props.user.username || '',
    username_message: ''
  }

  componentDidUpdate(prevProps) {
    console.log('this.props.user', this.props.user)
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({ ...this.state, ...this.props.user })
    }
  }

  handleShowEmailSignup = () => this.setState({ showEmailSignup: true })

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleUsernameInputChange = ({ value }) => {
    const { getUsernameAvailability } = this.props

    const regEx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    const validUsername = regEx.test(value)

    this.setState({ username: value })

    if (!validUsername || value.length < 6) {
      this.setState({
        username_message:
          'Username must be at least 5 characters and contain only letters and numbers'
      })
    }

    if (this.fetchTimeout) {
      clearTimeout(this.fetchTimeout)
    }

    this.fetchTimeout = setTimeout(() => {
      if (validUsername && value.length > 5) {
        getUsernameAvailability(value)
          .then(response =>
            this.setState({
              available: response.data.data.available,
              username_message: response.data.data.available
                ? 'Yes that username works!'
                : "That username isn't available =("
            })
          )
          .catch(e => console.log(e))
      }
    }, DURATIONS.GET_USERNAME_AVAILABILITY_DEBOUNCE)
  }

  handleClick = () => this.setState({ showForm: true })

  handleLinkClick = () => this.props.redirect('/login')

  handleSubmit = e => {
    e.preventDefault()

    const { first_name, last_name, username, email, password } = this.state

    const { updateUser, createUser, redirect, user } = this.props

    const body = {
      first_name,
      last_name,
      username,
      email,
      password
    }

    console.log('body in <CreateUser />')

    if (user.id) {
      updateUser(body, () => redirect('/feed'))
    } else {
      createUser(body, () => redirect('/feed'))
    }
  }

  renderCreateAccountForm = () => {
    const {
      first_name,
      last_name,
      username,
      username_message,
      email,
      password
    } = this.state

    const {
      ui: { loadingLine }
    } = this.props

    return (
      <form
        onSubmit={this.handleSubmit}
        className="d-flex flex-column align-items-center mt-3"
      >
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
          handleChange={this.handleUsernameInputChange}
          label="Username"
          name="username"
          placeholder="e.g. Shoreditch Jewels"
          required
          value={username}
        />
        {username_message && (
          <div className="mb-2 error-text-container text-center">
            <p className="m-0">{username_message}</p>
          </div>
        )}

        <TextInput
          handleChange={this.handleInputChange}
          label="Email"
          name="email"
          placeholder="e.g. team@minto.app"
          required
          type="email"
          value={email}
        />

        <PasswordInput
          required
          handleChange={this.handleInputChange}
          value={password}
        />

        <Button
          handleSubmit={this.handleSubmit}
          className="mt-2"
          text="Create account"
          submit
          loading={loadingLine}
        />
      </form>
    )
  }

  render() {
    const { showEmailSignup } = this.state
    const {
      ui: { loadingLine },
      user: { id }
    } = this.props
    console.log('createUser State', this.state)
    return (
      <Container className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center mt-2">
          Please sign up with one of the options below:
        </h3>

        {showEmailSignup || id ? (
          <Fragment>{this.renderCreateAccountForm()}</Fragment>
        ) : (
          <Button
            handleClick={this.handleShowEmailSignup}
            className="mt-2"
            text="Sign up with Email"
            loading={loadingLine}
          />
        )}

        {showEmailSignup && (
          <h3 className="text-center mt-5">Other options:</h3>
        )}

        <FacebookAuth className="mt-2" text="Sign up with Facebook" />

        <p className="mt-2 highlighted" onClick={this.handleLinkClick}>
          Got an account already? Log in here.
        </p>
      </Container>
    )
  }
}

export default connect(
  ({ ui, user }) => ({ ui, user }),
  { updateUser, createUser, redirect, getUsernameAvailability }
)(CreateUser)
