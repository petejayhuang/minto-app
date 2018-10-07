import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAddresses, deleteAddress } from '../../../actions/addresses'
import { redirect } from '../../../actions/ui'

import { TouchableRow } from '../../../components/TouchableRow'
import Button from '../../../components/Button'
import ChevronRightIcon from '../../../assets/icons/feather-react/ChevronRightIcon'

class Addresses extends Component {
  componentDidMount() {
    this.props.getAddresses()
  }

  handleEdit = id => {
    this.props.redirect(`/settings/addresses/${id}/edit`)
  }

  handleDelete = id => {
    this.props.deleteAddress(id)
  }
  handleClick = () => {
    this.props.redirect('/settings/addresses/add')
  }

  render() {
    const { all } = this.props.user.addresses

    return (
      <div className="route-container">
        {all.map(address => {
          const { id, address1, address2 } = address
          return (
            <TouchableRow.Menu
              id={id}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            >
              <div className="d-flex justify-content-between">
                <div>{`${address1} ${address2}`}</div>
                <div>
                  <ChevronRightIcon />
                </div>
              </div>
            </TouchableRow.Menu>
          )
        })}
        <div className="d-flex justify-content-center">
          <Button
            className="mt-4"
            text="Add new address"
            onClick={this.handleClick}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  { getAddresses, deleteAddress, redirect }
)(Addresses)
