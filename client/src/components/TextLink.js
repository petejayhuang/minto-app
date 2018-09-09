import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../styles/styleVariables'

const StyledLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    text-decoration: none;
    color: ${colors.primary};
  }
`

export const TextLink = ({ to, text, className }) => (
  <StyledLink className={className} to={to}>
    {text}
  </StyledLink>
)
