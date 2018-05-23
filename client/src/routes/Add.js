import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RouteContainer from '../components/RouteContainer'
import ImageUpload from '../components/ImageUpload'
import ProductDetails from '../components/ProductDetails'

import { connect } from 'react-redux'
import { uploadImagesToS3 } from '../actions'

class Add extends Component {
  state = {
    imageUploaders: 1,
    images: [],
    productName: ''
  }

  callbackFromParent = image => {
    console.log('image callbackfromParent', image)
    this.setState({
      images: this.state.images.concat(image)
    })
  }

  renderImageUploaders = () => {
    let ImageUploaders = []
    for (let i = 0; i < this.state.imageUploaders; i++) {
      ImageUploaders.push(
        <ImageUpload key={i} callbackFromParent={this.callbackFromParent} />
      )
    }
    return ImageUploaders
  }

  handleSubmit = () => {
    this.props.uploadImagesToS3({
      images: this.state.images,
      form: this.state.productName
    })
  }

  render() {
    console.log('this.state', this.state)
    return (
      <RouteContainer>
        <h1>Add images</h1>
        {this.renderImageUploaders()}
        <button
          onClick={() =>
            this.setState({ imageUploaders: this.state.imageUploaders + 1 })
          }
        >
          Add another image
        </button>
        {/* <ProductDetails /> */}
        <label>Product Name</label>
        <input
          onChange={this.handleInputChange}
          value={this.state.productName}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </RouteContainer>
    )
  }
}
Add.defaultProps = {}
Add.propTypes = {}

export default connect(null, { uploadImagesToS3 })(Add)
