import React from 'react'

import EmailLoginButton from '../../components/LoginButtons/EmailLoginButton'
import FacebookLoginButton from '../../components/LoginButtons/FacebookLoginButton'

const Login = () => {
  return (
    <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
      <p className="mt-2 mb-2">Please log in with one of the options below:</p>
      <EmailLoginButton />
      <FacebookLoginButton className="mt-2" />
    </div>
  )
}

export default Login
