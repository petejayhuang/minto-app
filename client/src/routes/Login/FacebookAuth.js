import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../actions'
import Button from '../../components/Button'
import { colors } from '../../styles/styleVariables'

const FacebookAuth = props => {
  const {
    authenticate,
    className,
    ui: { loadingLine },
    text
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
      text={text}
    />
  )
}

export default connect(
  ({ ui }) => ({ ui }),
  { authenticate }
)(FacebookAuth)
