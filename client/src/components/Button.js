import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
    background-color: ${colors.primary};
    color: white;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background-color: ${colors.primaryLight};
    }
  }
`

const Button = props => {
  const { className, text, onClick } = props
  return (
    <Container className={className}>
      <button onClick={onClick}>{text}</button>
    </Container>
  )
}

export default Button
