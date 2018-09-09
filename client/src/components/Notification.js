import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { clearError, clearSuccess } from '../actions'
import { colors } from '../styles/styleVariables'
import XIcon from '../assets/icons/feather-react/XIcon'

const Container = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  &:hover {
    cursor: pointer;
  }
`
class Notification extends Component {
  componentDidMount() {
    const { error, success, clearError, clearSuccess } = this.props
    if (error) {
      setTimeout(clearError, 2000)
    } else if (success) {
      setTimeout(clearSuccess, 2000)
    }
  }

  renderMessage = () => {
    const { error, success } = this.props
    if (error) {
      return error.message
    } else if (success) {
      return success
    }
  }

  handleClick = () => {
    const { clearSuccess, clearError } = this.props
    clearSuccess()
    clearError()
  }

  render() {
    const { success } = this.props
    return (
      <Container
        style={{
          backgroundColor: success ? colors.primaryLight : colors.warning,
          color: success ? 'white' : colors.text
        }}
        className="d-flex justify-content-center align-items-center p-3"
        onClick={() => this.handleClick()}
      >
        {this.renderMessage()}
        <XIcon stroke={success ? 'white' : colors.icon} />
      </Container>
    )
  }
}
const mapState = ({ error, success }) => ({ error, success })

Notification.propTypes = {
  clearError: PropTypes.func,
  clearSuccess: PropTypes.func,
  error: PropTypes.object
}

export default connect(
  mapState,
  { clearError, clearSuccess }
)(Notification)
