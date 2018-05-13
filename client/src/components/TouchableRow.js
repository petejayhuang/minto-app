import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import ChevronRightIcon from "../assets/icons/feather-react/ChevronRightIcon"
import { colors } from "../styles/styleVariables"

const Container = styled.div`
  background: white;
  border-top: 1px solid ${colors.border};
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${colors.border}` : "none"};
`

class TouchableRow extends Component {
  render() {
    const { borderBottom, className, text } = this.props
    return (
      <Container
        borderBottom={borderBottom}
        className={`flex-row between-center p-1 ${className}`}
      >
        <div>{text}</div>
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
  borderBottom: false
}
export default TouchableRow
