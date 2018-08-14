import React from 'react'
import { connect } from 'react-redux'
import { authenticateFacebookWithBE } from '../actions'
import Button from './Button'

const FacebookLoginButton = props => {
  const getLoginStatus = () => {
    window.FB.getLoginStatus(function(response) {
      props.authenticateFacebookWithBE(response.authResponse.accessToken)
    })
  }

  return (
    <Button
      handleClick={getLoginStatus}
      loading={props.ui.loadingLine}
      text="Login/ Sign up with Facebook"
    />
  )
}

export default connect(
  ({ ui }) => ({ ui }),
  { authenticateFacebookWithBE }
)(FacebookLoginButton)
