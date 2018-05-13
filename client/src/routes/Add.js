import React from "react"
import PropTypes from "prop-types"
import RouteContainer from "../components/RouteContainer"
import FileUpload from "../components/FileUpload"

const Add = props => (
  <RouteContainer>
    <FileUpload />
  </RouteContainer>
)

Add.defaultProps = {}
Add.propTypes = {}

export default Add
