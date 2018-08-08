import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { FACEBOOK_APP_ID } from '../../config/constants'
import { authenticateFacebookWithBE, printError } from '../../actions'

const Login = props => {
  const facebookResponse = async fbResponse => {
    try {
      await props.authenticateFacebookWithBE(fbResponse.accessToken)
    } catch (error) {
      props.printError({
        message: 'There was a problem with your sign up, please try again',
        error
      })
    }
  }

  return (
    <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
      <p className="mt-2 mb-2">Please login to view the app!</p>
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile"
        callback={facebookResponse}
      />
    </div>
  )
}

export default connect(
  null,
  {
    authenticateFacebookWithBE,
    printError
  }
)(Login)
