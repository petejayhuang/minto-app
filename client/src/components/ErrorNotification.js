import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { clearError } from '../actions'
import XIcon from '../assets/icons/feather-react/XIcon'

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 200px;
  height: 20px;
  background-color: orange;
  &:hover {
    cursor: pointer;
  }
`
class ErrorNotification extends Component {
  componentDidMount() {
    setTimeout(this.props.clearError, 1000)
  }
  render() {
    const {
      clearError,
      error: { message }
    } = this.props
    return (
      <Container className="flex-row center-center" onClick={clearError}>
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
