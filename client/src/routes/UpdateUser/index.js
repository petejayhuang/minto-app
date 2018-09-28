// libs
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// actions, helpers
import { updateUser } from '../../actions/user'
import { redirect } from '../../actions/ui'
import { uploadImagesToS3 } from '../../actions/images'

import Button from '../../components/Button'
import ImageUpload from '../../components/ImageUpload'
import PasswordInput from '../../components/PasswordInput'
import TextInput from '../../components/TextInput'

class CreateUser extends Component {
  state = {
    first_name: this.props.user.first_name || '',
    last_name: this.props.user.last_name || '',
    images: [],
    password: ''
  }

  addImage = image =>
    this.setState({
      images: this.state.images.concat(image)
    })

  removeImage = () => {
    this.setState({ images: [] })
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleSubmit = async e => {
    e.preventDefault()

    const { first_name, last_name, password, images } = this.state

    const {
      user: { id },
      uploadImagesToS3,
      updateUser
    } = this.props

    const body = {
      first_name,
      last_name,
      password
    }

    uploadImagesToS3({ images, upload_type: 'product' }, images => {
      body.profile_URL = images[0].image_URL
      console.log('BODY OF UPDATE', body)
      updateUser(body, () => redirect(`/store/${id}`))
    })
  }

  renderUpdateAccountForm = () => {
    const { first_name, last_name, password } = this.state

    const {
      ui: { loadingLine }
    } = this.props

    return (
      <form
        onSubmit={this.handleSubmit}
        className="d-flex flex-column align-items-center mt-3"
      >
        <label>New Store Logo</label>
        <ImageUpload
          className="m-1"
          addImage={this.addImage}
          removeImage={this.removeImage}
        />
        <TextInput
          handleChange={this.handleInputChange}
          label="First Name"
          name="first_name"
          placeholder="e.g. Peter"
          value={first_name}
        />

        <TextInput
          handleChange={this.handleInputChange}
          label="Last Name"
          name="last_name"
          placeholder="e.g. Huang"
          value={last_name}
        />

        <PasswordInput handleChange={this.handleInputChange} value={password} />

        <Button
          handleSubmit={this.handleSubmit}
          className="mt-2"
          text="Update account"
          submit
          loading={loadingLine}
        />
      </form>
    )
  }

  render() {
    return (
      <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
        {this.renderUpdateAccountForm()}
      </div>
    )
  }
}

export default connect(
  ({ ui, user }) => ({ ui, user }),
  { updateUser, redirect, uploadImagesToS3 }
)(CreateUser)
