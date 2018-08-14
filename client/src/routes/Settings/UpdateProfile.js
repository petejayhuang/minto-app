import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUsernameAvailability, updateUser, redirect } from '../../actions'
import styled from 'styled-components'

import Button from '../../components/Button'
const Container = styled.div`
  img {
    width: 200px;
    height: 200p;
    border-radius: 250px;
  }
  label {
    font-weight: 600;
  }
`
class UpdateProfile extends Component {
  state = {
    username_message: '',
    first_name: '',
    last_name: '',
    email: '',
    username: ''
  }

  fetchTimeout = null

  handleUsernameInputChange = value => {
    const regEx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    const { getUsernameAvailability } = this.props

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
    const { profile_URL, username } = this.props.user
    return (
      <Container className="route-container p-3">
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={this.handleSubmit}
        >
          {!username && (
            <p className="text-center">
              <strong>
                Welcome to Minto! Please check your details and add an username
                to get started.
              </strong>
            </p>
          )}

          <img className="pt-4" alt="profile" src={profile_URL} />

          {!username && (
            <Fragment>
              <label>Username</label>
              <input
                required
                className="small-input"
                type="text"
                onChange={e => this.handleUsernameInputChange(e.target.value)}
                value={this.state.username}
              />
            </Fragment>
          )}
          <p className="text-center">{this.state.username_message}</p>

          <Button
            loading={this.props.ui.loadingLine}
            className="mt-3"
            submit
            text="Save"
          />
        </form>
      </Container>
    )
  }
}

export default connect(
  ({ user, ui }) => ({ user, ui }),
  {
    getUsernameAvailability,
    redirect,
    updateUser
  }
)(UpdateProfile)
