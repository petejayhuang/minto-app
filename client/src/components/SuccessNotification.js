import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { clearSuccess } from '../actions'
import XIcon from '../assets/icons/feather-react/XIcon'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: ${colors.primaryLight};
  &:hover {
    cursor: pointer;
  }
`
class SuccessNotification extends Component {
  componentDidMount() {
    setTimeout(this.props.clearSuccess, 2000)
  }
  render() {
    const { clearSuccess, success } = this.props
    return (
      <Container
        className="d-flex justify-content-center align-items-center p-3"
        onClick={clearSuccess}
      >
        {success}
        <XIcon />
      </Container>
    )
  }
}
const mapState = ({ success }) => ({ success })

SuccessNotification.propTypes = {
  clearSuccess: PropTypes.func,
  success: PropTypes.string
}

export default connect(
  mapState,
  { clearSuccess }
)(SuccessNotification)
