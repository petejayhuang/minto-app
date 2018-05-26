import React, { Component } from "react"
import PropTypes from "prop-types"
import RouteContainer from "../components/RouteContainer"
import ImageUpload from "../components/ImageUpload"
import ProductDetails from "../components/ProductDetails"

import { connect } from "react-redux"
import { uploadImagesToS3, printError } from "../actions"

class Add extends Component {
  state = {
    imageUploaders: 1,
    images: [],
    name: "",
    description: "",
    price: 0,
    errorMessage: ""
  }

  addImage = image => {
    this.setState({
      images: this.state.images.concat(image)
    })
  }

  removeImage = imageName => {
    const newState = this.state.images.filter(image => {
      return image.name !== imageName
    })
    console.log("newState", newState)
    this.setState({ images: newState })
  }

  renderImageUploaders = () => {
    let ImageUploaders = []
    for (let i = 0; i < this.state.imageUploaders; i++) {
      ImageUploaders.push(
        <ImageUpload
          index={i}
          key={i}
          addImage={this.addImage}
          removeImage={this.removeImage}
        />
      )
    }
    return ImageUploaders
  }

  handleAddImageUploader = () => {
    const { imageUploaders } = this.state
    if (imageUploaders < 4) {
      return this.setState({ imageUploaders: imageUploaders + 1 })
    }

    this.props.printError({
      message: "Sorry, you can only upload 4 product images.",
      log: "Sorry, you can only upload 4 product images."
    })
  }

  handleInputChange = (inputName, e) => {
    this.setState({ [inputName]: e.target.value })
  }

  handleSubmit = () => {
    this.props.uploadImagesToS3({
      images: this.state.images,
      form: {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price
      }
    })
  }

  render() {
    console.log("this.state", this.state)
    return (
      <RouteContainer>
        <h1>Add images</h1>
        <div className="flex-row">{this.renderImageUploaders()}</div>
        <p className="error-text">{this.state.errorMessage}</p>
        <button onClick={this.handleAddImageUploader}>Add another image</button>
        {/* <ProductDetails /> */}
        <label>Product Name</label>
        <input
          type="text"
          onChange={e => this.handleInputChange("name", e)}
          value={this.state.name}
        />
        <label>Product Description</label>
        <textarea
          onChange={e => this.handleInputChange("description", e)}
          value={this.state.description}
        />
        <label>Product Price</label>
        <input
          type="text"
          onChange={e => this.handleInputChange("price", e)}
          value={this.state.price}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </RouteContainer>
    )
  }
}
Add.defaultProps = {}
Add.propTypes = {}

export default connect(null, { uploadImagesToS3, printError })(Add)
