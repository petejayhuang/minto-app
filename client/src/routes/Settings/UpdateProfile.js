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
    const {
      profile_URL,
      first_name,
      last_name,
      email,
      username
    } = this.props.user
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
                value={this.state.username || username}
              />
            </Fragment>
          )}
          {this.state.username_message}

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
