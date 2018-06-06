import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dropdown from '../components/Dropdown'
import RouteContainer from '../components/RouteContainer'
import ImageUpload from '../components/ImageUpload'
import ProductDetails from '../components/ProductDetails'

import { connect } from 'react-redux'
import { getProductCategories, uploadImagesToS3, printError } from '../actions'

class Add extends Component {
  state = {
    images: [],
    category: '',
    name: '',
    description: '',
    price: 0,
    errorMessage: ''
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getProductCategories()
    }
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
    this.setState({ images: newState })
  }

  renderImageUploaders = () =>
    [1, 2, 3, 4].map(index => (
      <ImageUpload
        index={index}
        key={index}
        addImage={this.addImage}
        removeImage={this.removeImage}
      />
    ))

  handleAddImageUploader = () => {
    const { imageUploaders } = this.state
    if (imageUploaders < 4) {
      return this.setState({ imageUploaders: imageUploaders + 1 })
    }

    this.props.printError({
      message: 'Sorry, you can only upload 4 product images.',
      log: 'Sorry, you can only upload 4 product images.'
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
        category: this.state.category,
        description: this.state.description,
        price: this.state.price
      }
    })
  }

  // pass down to <Dropdown/>
  handleOption = e => {
    this.setState({ category: e.target.value })
  }

  render() {
    console.log(this.state)
    return (
      <RouteContainer>
        <h1>Add images</h1>
        <div className="flex-wrap">{this.renderImageUploaders()}</div>
        <p className="error-text">{this.state.errorMessage}</p>
        <label>Product Name</label>
        <input
          type="text"
          onChange={e => this.handleInputChange('name', e)}
          value={this.state.name}
        />
        <label>Product Description</label>
        <Dropdown
          handleOption={this.handleOption}
          options={this.props.categories}
        />
        <label>Product Description</label>
        <textarea
          onChange={e => this.handleInputChange('description', e)}
          value={this.state.description}
        />
        <label>Product Price</label>
        <input
          type="text"
          onChange={e => this.handleInputChange('price', e)}
          value={this.state.price}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </RouteContainer>
    )
  }
}
Add.defaultProps = {}
Add.propTypes = {}

export default connect(
  ({ categories }) => ({ categories }),
  { getProductCategories, uploadImagesToS3, printError }
)(Add)
