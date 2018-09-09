import React from 'react'

import EmailLoginButton from '../../components/LoginButtons/EmailLoginButton'
import FacebookLoginButton from '../../components/LoginButtons/FacebookLoginButton'

const Login = () => {
  return (
    <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-2 mb-3">
        Please log in with one of the options below:
      </h3>
      <EmailLoginButton />
      <FacebookLoginButton className="mt-2" />
    </div>
  )
}

export default Login
