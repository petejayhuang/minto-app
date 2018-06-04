import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const ButtonContainer = styled.div`
  padding: 10px 20px;
`

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
  onClick: () => console.log("missing onClick handler!"),
  text: "Button Text"
}

export default SecondaryButton
