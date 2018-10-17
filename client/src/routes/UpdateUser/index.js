// libs
import React, { Component } from 'react'
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
    bank_account_number: this.props.user.bank_account_number || '',
    bank_sort_code: this.props.user.bank_sort_code || '',
    images: [],
    password: ''
  }

  addImage = image =>
    this.setState({
      images: this.state.images.concat(image)
    })

  removeImage = () => this.setState({ images: [] })

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

    if (images.length > 0) {
      console.log('image found, update user')
      uploadImagesToS3({ images, upload_type: 'profile pic' }, images => {
        body.profile_URL = images[0].image_URL
        updateUser(body, () => this.props.redirect(`/store/${id}`))
      })
    } else {
      console.log('no image, update user')
      updateUser(body, () => this.props.redirect(`/store/${id}`))
    }
  }

  renderUpdateAccountForm = () => {
    const {
      first_name,
      last_name,
      password,
      bank_account_number,
      bank_sort_code
    } = this.state

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

        <TextInput
          handleChange={this.handleInputChange}
          label="Bank Account Number"
          name="bank_account_number"
          placeholder="e.g. 1234 5678"
          value={bank_account_number}
        />
        <TextInput
          handleChange={this.handleInputChange}
          label="Bank Sort Code"
          name="bank_sort_code"
          placeholder="e.g. 00 00 00"
          value={bank_sort_code}
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
