// Add a way to go between a react router dom LINK, to an external link, to a
// Idea: <TouchableRow.InternaLink/>, <TouchableRow.Externalink/>, <TouchableRow.CustomHandler/>,
// for now just an internal link

import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ChevronRightIcon from '../assets/icons/feather-react/ChevronRightIcon'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  background: white;
  border-top: 1px solid ${colors.border};
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${colors.border}` : 'none'};
  &:hover {
    cursor: pointer;
  }
`

class TouchableRow extends Component {
  handleTouch = to => {
    this.props.push(to)
  }
  render() {
    const { borderBottom, className, text, to } = this.props
    return (
      <Container
        borderBottom={borderBottom}
        className={`d-flex justify-content-between align-items-center pl-3 p-1 ${className}`}
        onClick={() => this.handleTouch(to)}
      >
        <div className="m-0 p-0">{text}</div>
        <div>
          <ChevronRightIcon />
        </div>
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
export default connect(
  null,
  { push }
)(TouchableRow)
