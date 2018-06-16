import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { logWarning } from "../utilities/logWarning"

const ButtonContainer = styled.div``

const SecondaryButton = props => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
}

SecondaryButton.defaultProps = {
  onClick: () => logWarning("missing onClick handler!"),
  text: "Button Text"
}

export default SecondaryButton
