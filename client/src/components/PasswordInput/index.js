import React, { Component, Fragment } from 'react'
import { func, string } from 'prop-types'

class PasswordInput extends Component {
  state = {
    show_password: false
  }

  handleClick = () =>
    this.setState({ show_password: !this.state.show_password })

  render() {
    const { show_password } = this.state
    const { handleChange, value, required } = this.props

    
    return (
      <Fragment>
        <label className="mt-3 mb-0">Password</label>
        <input
          onChange={e =>
            handleChange({ value: e.target.value, name: 'password' })
          }
          required={required}
          type={show_password ? 'text' : 'password'}
          value={value}
        />
        <p className="hover-hand" onClick={this.handleClick}>
          {show_password ? 'Hide' : 'Show'} password
        </p>
      </Fragment>
    )
  }
}

PasswordInput.propTypes = {
  handleChange: func.isRequired,
  value: string.isRequired
}

export default PasswordInput
