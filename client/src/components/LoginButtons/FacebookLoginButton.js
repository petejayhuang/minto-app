import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../actions'
import Button from '../Button'
import { colors } from '../../styles/styleVariables'

const FacebookLoginButton = props => {
  const {
    authenticate,
    className,
    ui: { loadingLine }
  } = props
  return (
    <Button
      handleClick={() =>
        window.FB.login(
          loginResponse => {
            authenticate({
              method: 'facebook',
              accessToken: loginResponse.authResponse.accessToken
            })
          },
          { scope: 'email' }
        )
      }
      className={className}
      customColour={colors.facebook}
      loading={loadingLine}
      text="Facebook"
    />
  )
}

export default connect(
  ({ ui }) => ({ ui }),
  { authenticate }
)(FacebookLoginButton)
