import React from "react"
import styled from "styled-components"

import { colors } from "../styles/styleVariables"

const Container = styled.div`
  position: fixed;
  background-color: white;
  height: 50px;
  border-bottom: 1px solid ${colors.border};
  top: 0;
  width: 100vw;
`

const MobileTopNav = props => {
  const { className, children } = props
  return <Container className={className}>{children}</Container>
}

export default MobileTopNav
