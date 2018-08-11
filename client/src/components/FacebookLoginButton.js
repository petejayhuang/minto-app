import React from 'react'
import { connect } from 'react-redux'
import { authenticateFacebookWithBE } from '../actions'

const FacebookLoginButton = props => {
  const getLoginStatus = () => {
    console.log()
    console.log('getLoginStatus')
    window.FB.getLoginStatus(function(response) {
      props.authenticateFacebookWithBE(response.authResponse.accessToken)
      console.log('response', response)
    })
  }

  return <button onClick={getLoginStatus}>Login with Facebook </button>
}

export default connect(
  null,
  { authenticateFacebookWithBE }
)(FacebookLoginButton)
