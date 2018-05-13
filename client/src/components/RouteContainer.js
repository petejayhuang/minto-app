import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../styles/styleVariables"

const Container = styled.div`
  background-color: ${colors.background};
  margin-top: 51px;
`

const RouteContainer = ({ noPadding, children }) => {
  return <Container className={`${!noPadding && "p-2"}`}>{children}</Container>
}

RouteContainer.propTypes = {}

RouteContainer.defaultProps = {}

export default RouteContainer
