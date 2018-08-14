import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/styleVariables'
import LoaderIcon from '../assets/icons/feather-react/LoaderIcon'

const Container = styled.div`
  button {
    padding: 5px 10px;
    border: ${props =>
      props.secondary ? `1px solid ${colors.primary}` : 'none'};
    border-radius: 8px;
    background-color: ${props => (props.secondary ? 'white' : colors.primary)};
    color: ${props => (props.secondary ? colors.primary : 'white')};
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: white;
      background-color: ${props =>
        props.secondary ? colors.primary : colors.primaryLight};
    }
  }
`

const Button = props => {
  const { className, text, handleClick, submit, loading } = props

  const renderContent = () => {
    if (loading) {
      return <LoaderIcon stroke="white" />
    } else {
      return text
    }
  }
  return (
    <Container {...props} className={className}>
      <button
        disabled={loading}
        type={submit ? 'submit' : 'button'}
        className="d-flex justify-content-center align-items-center"
        onClick={handleClick}
      >
        {renderContent()}
      </button>
    </Container>
  )
}

export default Button
