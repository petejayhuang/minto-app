import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { clearError } from '../actions'
import { colors } from '../styles/styleVariables'
import XIcon from '../assets/icons/feather-react/XIcon'

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: ${colors.warning};
  &:hover {
    cursor: pointer;
  }
`
class ErrorNotification extends Component {
  componentDidMount() {
    setTimeout(this.props.clearError, 2000)
  }
  render() {
    const {
      clearError,
      error: { message }
    } = this.props
    return (
      <Container
        className="d-flex justify-content-center align-items-center p-3"
        onClick={clearError}
      >
        {message}
        <XIcon />
      </Container>
    )
  }
}
const mapState = ({ error }) => ({ error })

ErrorNotification.propTypes = {
  clearError: PropTypes.func,
  error: PropTypes.object
}

export default connect(
  mapState,
  { clearError }
)(ErrorNotification)
