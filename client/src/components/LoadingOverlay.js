import React from 'react'
import styled from 'styled-components'

import { colors } from '../styles/styleVariables'
import LoaderIcon from '../assets/icons/feather-react/LoaderIcon'

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 900;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
`
const LoadingOverlay = () => (
  <Container className="flex-row center-center">
    <div className="flex-column center-center">
      <p className="mb-5">doing some internet stuff</p>
      <p className="mb-5">please don't refresh the page!</p>
      <LoaderIcon />
    </div>
  </Container>
)

export default LoadingOverlay
