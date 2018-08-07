// TODO
// validation on input (special chars etc)
// debounce on the input\
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { FACEBOOK_APP_ID } from '../../config/constants'
import {
  authenticateFacebookWithBE,
  getUsernameAvailability,
  updateUser
} from '../../actions'
import styled from 'styled-components'

import Button from '../../components/Button'
const Container = styled.div`
  img {
    width: 200px;
    height: 200p;x
  }
  label {
    font-weight: 600;
  }
`
class Login extends Component {
  state = {
    isAuthenticated: false,
    username_message: '',
    first_name: '',
    last_name: '',
    email: '',
    username: ''
  }

  fetchTimeout = null

  logout = () => {
    this.setState({ isAuthenticated: false })
  }

  facebookResponse = async fbResponse => {
    try {
      await this.props.authenticateFacebookWithBE(fbResponse.accessToken)
      this.setState({ isAuthenticated: false })
    } catch (e) {
      this.setState({
        error: 'There was a problem with your sign up, please try again'
      })
    }
  }

  handleUsernameInputChange = value => {
    this.setState({ username: value })
    if (this.fetchTimeout) {
      clearTimeout(this.fetchTimeout)
    }

    this.fetchTimeout = setTimeout(() => {
      if (value.length > 5) {
        this.props
          .getUsernameAvailability(value)
          .then(response => {
            this.setState({
              available: response.data.data.available,
              username_message: response.data.data.available
                ? 'Yes that username works!'
                : "That username isn't available =("
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
    }, 1000)
  }
  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { first_name, last_name, email, username } = this.state

    this.props.updateUser({
      first_name,
      last_name,
      email,
      username,
      redirect_URL: '/feed'
    })
  }

  render() {
    return (
      <Container className="route-container p-3">
        {this.props.user.id && !this.props.user.username ? (
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={this.handleSubmit}
          >
            <p className="text-center">
              <strong>
                Welcome to Minto! Please check your details and add an username
                to get started.
              </strong>
            </p>
            <img alt="profile" src={this.props.user.profile_URL} />

            <div className="d-flex flex-column">
              <label className="pt-3">First Name</label>
              <input
                type="text"
                className="small-input"
                required
                onChange={e =>
                  this.handleTextInputChange('first_name', e.target.value)
                }
                value={this.state.first_name || this.props.user.first_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Last Name</label>
              <input
                required
                className="small-input"
                type="text"
                onChange={e =>
                  this.handleTextInputChange('last_name', e.target.value)
                }
                value={this.state.last_name || this.props.user.last_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Email</label>
              <input
                required
                className="small-input"
                type="text"
                onChange={e =>
                  this.handleTextInputChange('email', e.target.value)
                }
                value={this.state.email || this.props.user.email}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Username</label>
              <input
                required
                className="small-input"
                type="text"
                onChange={e => this.handleUsernameInputChange(e.target.value)}
                value={this.state.username || this.props.user.username}
              />
              {this.state.username_message}
            </div>
            <Button className="mt-3" submit text="Save" />
          </form>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mt-2 mb-2">Please login to view the app!</p>
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile"
              callback={this.facebookResponse}
            />
          </div>
        )}
      </Container>
    )
  }
}

Login.defaultProps = {}
Login.propTypes = {}

export default connect(
  ({ ui, user }) => ({ ui, user }),
  {
    authenticateFacebookWithBE,
    getUsernameAvailability,
    updateUser
  }
)(Login)
