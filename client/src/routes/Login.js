import React, { Component } from "react"
import { connect } from "react-redux"
import FacebookLogin from "react-facebook-login"
import { FACEBOOK_APP_ID } from "../config/constants"
import { authenticateFacebookWithBE, updateUser } from "../actions"

class Login extends Component {
  state = {
    isAuthenticated: false,
    first_name: "",
    last_name: "",
    email: "",
    username: ""
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null })
  }

  facebookResponse = async fbResponse => {
    this.props.authenticateFacebookWithBE(fbResponse.accessToken)
  }

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { first_name, last_name, email, username } = this.state
    this.props.updateUser({
      first_name,
      last_name,
      email,
      username
    })
  }

  render() {
    const { authenticated } = this.state
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
                onChange={e =>
                  this.handleTextInputChange("username", e.target.value)
                }
                value={this.state.username || this.props.user.username}
              />
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
    updateUser
  }
)(Login)
