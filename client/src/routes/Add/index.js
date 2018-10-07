import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ImageUpload from '../../components/ImageUpload'
import Button from '../../components/Button'
import { getProductCategories, uploadProduct, redirect } from '../../actions'
import requireAuth from '../../components/HigherOrder/requireAuth'
import Dropdown from '../../components/Dropdown'

class Add extends Component {
  state = {
    category_id: null,
    description: '',
    images: [],
    price: 0,
    meet_in_person: false,
    shipping: false
  }

  componentDidMount() {
    if (!this.props.user.id) {
      this.props.redirect('/login')
    } else {
      if (this.props.categories.length === 0) {
        this.props.getProductCategories()
      }
    }
  }

  addImage = image =>
    this.setState({
      images: this.state.images.concat(image)
    })

  removeImage = imageName => {
    const newState = this.state.images.filter(image => image.name !== imageName)
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

  handleTextInputChange = (inputName, value) =>
    this.setState({ [inputName]: value })

  handleCheckboxChange = checkboxName =>
    this.setState({
      [checkboxName]: !this.state[checkboxName]
    })

  handleSubmit = e => {
    e.preventDefault()
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

  handleOptionSelect = value => this.setState({ category_id: value })

  render() {
    const {
      ui: { loadingLine }
    } = this.props
    return (
      <div className="route-container d-flex flex-column align-items-center p-3">
        <div className="d-flex justify-content-center flex-wrap">
          {this.renderImageUploaders()}
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column">
            <label className="mt-3">
              <strong>Product Category</strong>
            </label>
            <Dropdown
              handleSelect={this.handleOptionSelect}
              dropdownItems={this.props.categories}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="mt-3">
              <strong>Product Description</strong>
            </label>
            <textarea
              required
              onChange={e =>
                this.handleTextInputChange('description', e.target.value)
              }
              value={this.state.description}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="mt-3">
              <strong>Product Price (£)</strong>
            </label>
            <input
              required
              type="number"
              onChange={e =>
                this.handleTextInputChange('price', e.target.value)
              }
              value={this.state.price}
            />
          </div>

          <div className="d-flex mt-3 justify-content-center">
            <Button loading={loadingLine} text="Submit" submit />
          </div>
        </form>
      </div>
    )
  }
}

export default compose(
  connect(
    ({ user, categories, ui }) => ({ user, categories, ui }),
    { getProductCategories, uploadProduct, redirect }
  ),
  requireAuth
)(Add)
