// Add a way to go between a react router dom LINK, to an external link, to a
// Idea: <TouchableRow.InternaLink/>, <TouchableRow.Externalink/>, <TouchableRow.CustomHandler/>,
// for now just an internal link

import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ChevronRightIcon from '../assets/icons/feather-react/ChevronRightIcon'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  background: white;
  border-top: 1px solid ${colors.border};
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${colors.border}` : 'none'};
`

class TouchableRow extends Component {
  render() {
    const { borderBottom, className, text, to } = this.props
    return (
      <Container
        borderBottom={borderBottom}
        className={`flex-row between-center p-1 ${className}`}
      >
        <Link to={to} className="flex-between">
          <div>{text}</div>
          <div>
            <ChevronRightIcon />
          </div>
        </Link>
      </Container>
    )
  }
}

TouchableRow.propTypes = {
  borderBottom: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string
}

TouchableRow.defaultProps = {
  to: '/',
  borderBottom: false
}
export default TouchableRow
