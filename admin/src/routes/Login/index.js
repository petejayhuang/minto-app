import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginAdmin } from '../../actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  // auth/login
  handleChange = (value, inputName) => {
    this.setState({ [inputName]: value })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    this.props.loginAdmin({ email, password })
  }

  render() {
    return (
      <div>
        {/* {this.props.auth && <Redirect to="/dashboard" />} */}
        <label>email</label>
        <input
          type="text"
          onChange={e => this.handleChange(e.target.value, 'email')}
          value={this.state.email}
        />
        <label>password</label>
        <input
          type="password"
          onChange={e => this.handleChange(e.target.value, 'password')}
          value={this.state.password}
        />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    )
  }
}
export default connect(
  ({ auth }) => ({ auth }),
  { loginAdmin }
)(Login)
