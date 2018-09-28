import React, { Component } from 'react'
import { connect } from 'react-redux'

import { redirect } from '../../../actions/ui'

import TouchableMenu from '../../../components/TouchableMenu'

class CreateAddresses extends Component {
  state = {
    address_type: '',
    address_name: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: '',
    country_code: '',
    primary_YN: null
  }

  componentDidMount() {
    this.props.getAddresses(this.props.user.id)
  }

  handleEdit = id => {
    console.log('handleEdit', id)
    this.props.redirect(`/settings/addresses/${id}`)
  }

  handleDelete = id => {
    console.log('handleDelete', id)
    this.props.deleteAddress(id)
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()

    const { createAddress, redirect } = this.props

    const body = {
      first_name,
      last_name,
      username,
      email,
      password
    }

    console.log('body in <CreateUser />')

    createAddress(body, () => redirect('/settings/addresses'))
  }

  render() {
    return (
      <div className="route-container">
        <form onSubmit={this.handleSubmit}>
          <TextInput
            handleChange={this.handleInputChange}
            label="Address Name"
            name="address_name"
            required
            placeholder="e.g. London Home"
            value={address_name}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Address Line 1"
            name="address1"
            required
            placeholder="e.g. Flat 2"
            value={address1}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Address Line 2"
            name="address2"
            required
            placeholder="e.g. 222 Shoreditch High St"
            value={address2}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="City"
            name="city"
            required
            placeholder="e.g. London"
            value={city}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Postcode"
            name="postcode"
            required
            placeholder="e.g. E1 6AX"
            value={postcode}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Country"
            name="country"
            required
            placeholder="e.g. United Kingdom"
            value={country}
          />

          <Checkbox label="Set as default address" checked={true} />

          <Button
            handleSubmit={this.handleSubmit}
            className="mt-2"
            text="Create account"
            submit
            loading={loadingLine}
          />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createAddress, redirect }
)(CreateAddresses)
