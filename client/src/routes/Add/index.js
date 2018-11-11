import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  getProductCategories,
  uploadProduct,
  redirect,
  printError
} from '../../actions'
import requireAuth from '../../components/HigherOrder/requireAuth'

import Button from '../../components/Button'
import XCircleIcon from '../../assets/icons/feather-react/XCircleIcon'
import Dropdown from '../../components/Dropdown'
import ImageUpload from '../../components/ImageUpload'
import { colors } from '../../styles/styleVariables'

const Container = styled.div`
  .hashtag-list {
    max-width: 320px;
  }
  .hashtag {
    border-radius: 30px;
    border: 1px solid ${colors.primaryLight};
  }
`

class Add extends Component {
  state = {
    category_id: null,
    currentHashtag: '',
    description: '',
    hashtags: [],
    images: [],
    price: 0,
    title: ''
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
    Array(4)
      .fill('')
      .map(index => (
        <ImageUpload
          index={index}
          key={index}
          addImage={this.addImage}
          removeImage={this.removeImage}
        />
      ))

  renderHashtags = () => {
    const { hashtags } = this.state
    if (hashtags.length > 0) {
      return (
        <ul className="hashtag-list d-flex flex-wrap mb-2 m-0 p-0">
          {hashtags.map(hashtag => (
            <li
              onClick={() => this.handleRemoveHashtag(hashtag)}
              className="hover-hand pt-1 pr-2 pb-1 pl-2 hashtag mb-2 mr-2 d-flex justify-content-between"
            >
              <span className="pr-2">{hashtag}</span>

              <XCircleIcon stroke={colors.primaryLight} />
            </li>
          ))}
        </ul>
      )
    }
  }

  handleRemoveHashtag = value => {
    const hashtags = this.state.hashtags.filter(hashtag => hashtag !== value)
    this.setState({ hashtags })
  }

  handleAddHashtag = () => {
    const { hashtags, currentHashtag } = this.state
    if (hashtags.length < 5 && currentHashtag.length > 0) {
      this.setState({
        hashtags: hashtags.concat(currentHashtag),
        currentHashtag: ''
      })
    } else {
      if (currentHashtag.length > 0)
        this.props.printError({ message: 'You can only add 5 hashtags' })
    }
  }

  handleTextInputChange = (inputName, value) =>
    this.setState({ [inputName]: value })

  handleCheckboxChange = checkboxName =>
    this.setState({
      [checkboxName]: !this.state[checkboxName]
    })

  handleSubmit = e => {
    e.preventDefault()
    const {
      images,
      category_id,
      description,
      hashtags,
      price,
      title
    } = this.state
    this.props.uploadProduct({
      images,
      form: {
        category_id: Number(category_id),
        description,
        hashtags,
        price: Number(price),
        title
      }
    })
  }

  handleOptionSelect = value => this.setState({ category_id: value })

  render() {
    const {
      ui: { loadingLine }
    } = this.props
    return (
      <Container className="route-container d-flex flex-column align-items-center p-3">
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
              <strong>Product Title</strong>
            </label>

            <input
              required
              type="text"
              onChange={e =>
                this.handleTextInputChange('title', e.target.value)
              }
              value={this.state.title}
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

          <div className="d-flex flex-column">
            <label className="mt-3">
              <strong>Hashtags</strong>
            </label>
            {this.renderHashtags()}
            <input
              type="text"
              onChange={e =>
                this.handleTextInputChange('currentHashtag', e.target.value)
              }
              value={this.state.currentHashtag}
            />
            <Button
              className="mt-2"
              secondary
              onClick={this.handleAddHashtag}
              text="Add hashtag"
            />
          </div>

          <div className="d-flex mt-3 justify-content-center">
            <Button loading={loadingLine} text="Submit" submit />
          </div>
        </form>
      </Container>
    )
  }
}

export default compose(
  connect(
    ({ user, categories, ui }) => ({ user, categories, ui }),
    { getProductCategories, uploadProduct, redirect, printError }
  ),
  requireAuth
)(Add)
