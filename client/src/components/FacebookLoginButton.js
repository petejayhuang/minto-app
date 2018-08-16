import React from 'react'
import { connect } from 'react-redux'
import { authenticateFacebookWithBE } from '../actions'
import Button from './Button'

const FacebookLoginButton = props => {
  const getLoginStatus = () => {
    window.FB.getLoginStatus(function(statusResponse) {
      console.log('statusResponse', statusResponse)

      if (statusResponse.status === 'connected') {
        props.authenticateFacebookWithBE(
          statusResponse.authResponse.accessToken
        )
      }

      if (statusResponse.status === 'not_authorized') {
        console.log('not_authorized!')
        window.FB.login(
          function(loginResponse) {
            props.authenticateFacebookWithBE(
              loginResponse.authResponse.accessToken
            )
          },
          { scope: 'email,user_link' }
        )
      }
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
