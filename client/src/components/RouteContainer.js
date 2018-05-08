import React from "react"
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 50px;
`

const RouteContainer = ({ children }) => {
  return <Container className="test">{children}</Container>
}

export default RouteContainer
