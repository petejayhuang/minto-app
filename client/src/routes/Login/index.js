import React, { Component } from 'react'

import FacebookLoginButton from '../../components/FacebookLoginButton'

const Login = props => {
  return (
    <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
      <p className="mt-2 mb-2">Please login to view the app</p>
      <FacebookLoginButton />
    </div>
  )
}

export default Login
