import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { clearError } from "../actions"
import { colors } from "../styles/styleVariables"
import AlertTriangleIcon from "../assets/icons/feather-react/AlertTriangleIcon"
import XIcon from "../assets/icons/feather-react/XIcon"

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: 200px;
  height: 20px;
  background-color: orange;
  &:hover {
    cursor: pointer;
  }
`
const ErrorOverlay = props => (
  <Container className="flex-row center-center" onClick={props.clearError}>
    {props.error.message}
    <XIcon />
  </Container>
)

const mapState = ({ error }) => ({ error })

export default connect(mapState, { clearError })(ErrorOverlay)
