import React from 'react'
import { connect } from 'react-redux'
import { redirect } from '../../actions/ui'

import EmailLogin from './EmailLogin'
import FacebookAuth from './FacebookAuth'

const Login = props => {
  const handleClick = () => props.redirect('/create-account')
  return (
    <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-2 mb-3">
        Please log in with one of the options below:
      </h3>
      <EmailLogin />
      <FacebookAuth text="Login with Facebook" className="mt-2" />
      <p className="mt-2 highlighted" onClick={handleClick}>
        Or sign up here
      </p>
    </div>
  )
}

export default connect(
  null,
  { redirect }
)(Login)
