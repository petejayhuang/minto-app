// TODO
// validation on input (special chars etc)
// debounce on the input\
import React, { Component } from "react"
import { connect } from "react-redux"
import FacebookLogin from "react-facebook-login"
import { FACEBOOK_APP_ID } from "../../config/constants"
import {
  authenticateFacebookWithBE,
  getUsernameAvailability,
  updateUser,
  createCustomer,
  addCardToCustomer,
  createTransaction
} from "../../actions"

class Login extends Component {
  state = {
    isAuthenticated: false,
    username_message: "",
    first_name: "",
    last_name: "",
    email: "",
    username: ""
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
        error: "There was a problem with your sign up, please try again"
      })
    }
  }

  handleUsernameInputChange = value => {
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
                ? "Yes can do!"
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
    await this.props.updateUser({
      first_name,
      last_name,
      email,
      username
    })

    await this.props.createCustomer({
      first_name: first_name || this.props.user.first_name,
      last_name: last_name || this.props.user.last_name,
      email: email || this.props.user.email
    })

    await this.props.addCardToCustomer()

    this.props.createTransaction()
  }

  render() {
    return (
      <div className="route-container p-3">
        {this.props.user.username === null ? (
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex flex-column">
              <label>First Name</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange("first_name", e.target.value)
                }
                value={this.state.first_name || this.props.user.first_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Last Name</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange("last_name", e.target.value)
                }
                value={this.state.last_name || this.props.user.last_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Email</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange("email", e.target.value)
                }
                value={this.state.email || this.props.user.email}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Username</label>
              <input
                required
                onChange={e => this.handleUsernameInputChange(e.target.value)}
                value={this.state.username || this.props.user.username}
              />
              {this.state.username_message}
            </div>
            <button type="submit">Next</button>
          </form>
        ) : (
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
          />
        )}
      </div>
    )
  }
}

Login.defaultProps = {}
Login.propTypes = {}

export default connect(
  ({ user }) => ({ user }),
  {
    authenticateFacebookWithBE,
    getUsernameAvailability,
    updateUser,
    createCustomer,
    addCardToCustomer,
    createTransaction
  }
)(Login)
