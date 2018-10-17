import React, { Component } from 'react'
import { connect } from 'react-redux'

import { redirect } from '../../../actions/ui'
import {
  createAddress,
  getAddress,
  updateAddress
} from '../../../actions/addresses'

import Button from '../../../components/Button'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'
import TextInput from '../../../components/TextInput'

class CreateEditAddress extends Component {
  state = {
    isEditMode: this.props.match.params.id ? true : false,
    id: this.props.user.addresses.current.id || '',
    address_type: this.props.user.addresses.current.address_type || '',
    address_name: this.props.user.addresses.current.address_name || '',
    address1: this.props.user.addresses.current.address1 || '',
    address2: this.props.user.addresses.current.address2 || '',
    city: this.props.user.addresses.current.city || '',
    postcode: this.props.user.addresses.current.postcode || '',
    country: this.props.user.addresses.current.country || '',
    country_code: 'UK',
    primary_YN: false
  }

  componentDidUpdate(prevProps) {
    const prevAddressId = prevProps.user.addresses.current.id
    const currAddressId = this.props.user.addresses.current.id

    if (prevAddressId !== currAddressId) {
      this.setState({
        address_type: this.props.user.addresses.current.address_type,
        address_name: this.props.user.addresses.current.address_name,
        address1: this.props.user.addresses.current.address1,
        address2: this.props.user.addresses.current.address2,
        city: this.props.user.addresses.current.city,
        postcode: this.props.user.addresses.current.postcode,
        country: this.props.user.addresses.current.country
      })
    }
  }

  componentDidMount() {
    if (this.state.isEditMode) {
      this.props.getAddress(this.props.match.params.id)
    }
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()

    const {
      isEditMode,
      address_type,
      address_name,
      address1,
      address2,
      city,
      id,
      postcode,
      country,
      primary_YN
    } = this.state

    const body = {
      address1,
      address2,
      address_name,
      address_type,
      city,
      country,
      country_code: 'UK',
      postcode,
      primary_YN
    }

    const { createAddress, updateAddress, redirect } = this.props
    if (isEditMode) {
      return updateAddress({ body, id }, () => redirect('/settings/addresses'))
    }
    return createAddress(body, () => redirect('/settings/addresses'))
  }

  handleCheckbox = () => {
    this.setState({ primary_YN: !this.state.primary_YN })
  }

  handleSelect = value => {
    this.setState({ address_type: value })
  }

  render() {
    const {
      address_name,
      address1,
      address2,
      city,
      postcode,
      country,
      isEditMode
    } = this.state

    const {
      ui: { loadingLine }
    } = this.props

    const addressTypeOptions = [
      { label: 'Billing Address', value: 'billing' },
      { label: 'Delivery Address', value: 'delivery' }
    ]

    return (
      <div className="route-container d-flex justify-content-center">
        <form onSubmit={this.handleSubmit} className="d-flex flex-column pt-3">
          <Dropdown
            label="Address Type"
            dropdownItems={addressTypeOptions}
            handleSelect={this.handleSelect}
          />
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

          <Checkbox
            label="Set as default address"
            handleCheckbox={this.handleCheckbox}
            checked={this.state.primary_YN}
          />

          <Button
            handleSubmit={this.handleSubmit}
            className="mt-2"
            text={isEditMode ? 'Update account' : 'Create account'}
            submit
            loading={loadingLine}
          />
        </form>
      </div>
    )
  }
}

export default connect(
  ({ ui, user }) => ({ ui, user }),
  { createAddress, getAddress, updateAddress, redirect }
)(CreateEditAddress)
