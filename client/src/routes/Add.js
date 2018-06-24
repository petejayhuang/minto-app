import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ImageUpload from "../components/ImageUpload"

import { getProductCategories, uploadImagesToS3 } from "../actions"

class Add extends Component {
  state = {
    category_id: 11,
    description: "",
    images: [],
    meet_in_person: null,
    shipping: null
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

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleCheckboxChange = (checkboxName, e) => {
    this.setState({
      [checkboxName]: !this.state.meet_in_person
    })
  }

  handleSubmit = () => {
    this.props.uploadImagesToS3({
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
        <div className="d-flex flex-wrap">{this.renderImageUploaders()}</div>

        <div className="d-flex flex-column">
          <label>Product Category</label>
          {this.renderCategoryDropdown()}
        </div>

        <div className="d-flex flex-column">
          <label>Product Description</label>
          <textarea
            onChange={e =>
              this.handleTextInputChange("description", e.target.value)
            }
            value={this.state.description}
          />
        </div>

        <div className="d-flex flex-column">
          <label>Product Price</label>
          <input
            type="text"
            onChange={e => this.handleTextInputChange("price", e.target.value)}
            value={this.state.price}
          />
        </div>

        <div className="d-flex">
          <label htmlFor="shipping">UK Shipping</label>
          <input
            id="shipping"
            onChange={e => this.handleCheckboxChange("shipping", e)}
            type="checkbox"
            value="shipping"
          />

          <div className="d-flex">
            <label htmlFor="meet_in_person">Meet in person</label>
            <input
              onChange={e => this.handleCheckboxChange("meet_in_person", e)}
              id="meet_in_person"
              value="meet-in-person"
              type="checkbox"
            />
          </div>
        </div>

        <button name="meet-in-person" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    )
  }
}
Add.defaultProps = {}
Add.propTypes = {}

export default connect(
  ({ categories }) => ({ categories }),
  { getProductCategories, uploadImagesToS3 }
)(Add)
