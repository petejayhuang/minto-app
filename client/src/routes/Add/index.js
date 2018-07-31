import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImageUpload from '../../components/ImageUpload'
import Button from '../../components/Button'

import { getProductCategories, uploadProduct } from '../../actions'

class Add extends Component {
  state = {
    category_id: null,
    description: '',
    images: [],
    meet_in_person: false,
    shipping: false
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
        className="m-1"
        index={index}
        key={index}
        addImage={this.addImage}
        removeImage={this.removeImage}
      />
    ))

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleCheckboxChange = (checkboxName, e) => {
    this.setState({
      [checkboxName]: !this.state[checkboxName]
    })
  }

  handleSubmit = () => {
    this.props.uploadProduct({
      images: this.state.images,
      form: {
        category_id: Number(this.state.category_id),
        description: this.state.description,
        price: Number(this.state.price),
        meet_in_person_YN: this.state.meet_in_person,
        shipping_YN: this.state.shipping
      }
    })
  }

  handleOption = e => {
    this.setState({ category_id: e.target.value })
  }

  renderCategoryDropdown = () => (
    <select onChange={e => this.handleOption(e)}>
      {this.props.categories.map(category => (
        <option value={category.category_id} key={category.product_type}>
          {category.product_type}
        </option>
      ))}
    </select>
  )

  render() {
    return (
      <div className="route-container p-3">
        <div className="d-flex justify-content-center flex-wrap">
          {this.renderImageUploaders()}
        </div>

        <div className="d-flex flex-column">
          <label className="mt-3">
            <strong>Product Category</strong>
          </label>
          {this.renderCategoryDropdown()}
        </div>

        <div className="d-flex flex-column">
          <label className="mt-3">
            <strong>Product Description</strong>
          </label>
          <textarea
            onChange={e =>
              this.handleTextInputChange('description', e.target.value)
            }
            value={this.state.description}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="mt-3">
            <strong>Product Price</strong>
          </label>
          <input
            type="text"
            onChange={e => this.handleTextInputChange('price', e.target.value)}
            value={this.state.price}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="mt-3">
            <strong>Available Delivery Methods</strong>
          </label>

          <div className="d-flex align-items-center">
            <input
              id="shipping"
              onChange={e => this.handleCheckboxChange('shipping', e)}
              type="checkbox"
              value="shipping"
              checked={this.state.shipping}
            />
            <label className="ml-2 m-0" htmlFor="shipping">
              UK Shipping
            </label>
          </div>

          <div className="d-flex align-items-center">
            <input
              onChange={e => this.handleCheckboxChange('meet_in_person', e)}
              id="meet_in_person"
              value="meet-in-person"
              type="checkbox"
              checked={this.state.meet_in_person}
            />
            <label className="ml-2 m-0" htmlFor="meet_in_person">
              Meet in person
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <Button onClick={this.handleSubmit} text="Submit" />
        </div>
      </div>
    )
  }
}

export default connect(
  ({ categories }) => ({ categories }),
  { getProductCategories, uploadProduct }
)(Add)
