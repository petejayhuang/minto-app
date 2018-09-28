import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAddresses, deleteAddress } from '../../../actions/addresses'
import { redirect } from '../../../actions/ui'

import TouchableMenu from '../../../components/TouchableMenu'

class Addresses extends Component {
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

  render() {
    const { addresses } = this.props.user

    return (
      <div className="route-container">
        {addresses.map(address => {
          const { id } = address
          return (
            <TouchableMenu
              id={id}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            >
              ADDDRESS
              {id}
            </TouchableMenu>
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  { getAddresses, deleteAddress, redirect }
)(Addresses)