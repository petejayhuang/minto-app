import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticateFacebookWithBE } from '../actions'
import Button from './Button'

class FacebookLoginButton extends Component {
  state = {}

  componentDidMount() {
    if (window) {
      window.FB.getLoginStatus(response => {
        console.log('response', response)
        if (response.status === 'connected') {
          this.props.authenticateFacebookWithBE(
            response.authResponse.accessToken
          )
          this.setState({ response })
        }
      })
    }
  }

  facebookAuthenticate = () => {
    window.FB.login(
      loginResponse => {
        this.props.authenticateFacebookWithBE(
          loginResponse.authResponse.accessToken
        )
      },
      { scope: 'email,user_link' }
    )
  }

  render() {
    return (
      <Button
        handleClick={this.facebookAuthenticate}
        loading={this.props.ui.loadingLine}
        text="Login/ Sign up with Facebook"
      />
    )
  }
}

export default connect(
  ({ ui }) => ({ ui }),
  { authenticateFacebookWithBE }
)(FacebookLoginButton)
