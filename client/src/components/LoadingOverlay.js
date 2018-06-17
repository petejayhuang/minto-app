import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { colors } from "../styles/styleVariables"
import LoaderIcon from "../assets/icons/feather-react/LoaderIcon"

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 900;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
`
const LoadingOverlay = props => (
  <Container className="d-flex justify-content-center align-items-center">
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className="mb-5">{props.ui.loadingOverlayMessage}</p>
      <LoaderIcon />
    </div>
  </Container>
)

export default connect(
  ({ ui }) => ({ ui }),
  null
)(LoadingOverlay)
