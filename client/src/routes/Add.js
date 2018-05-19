import React from "react"
import PropTypes from "prop-types"
import RouteContainer from "../components/RouteContainer"
import ImageUpload from "../components/ImageUpload"
import ProductDetails from "../components/ProductDetails"

const Add = props => (
  <RouteContainer>
    <ImageUpload />
    <ProductDetails />
  </RouteContainer>
)

Add.defaultProps = {}
Add.propTypes = {}

export default Add
