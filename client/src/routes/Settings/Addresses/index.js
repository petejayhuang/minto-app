import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAddresses, deleteAddress } from '../../../actions/addresses'
import { redirect } from '../../../actions/ui'

import { TouchableRow } from '../../../components/TouchableRow'
import Button from '../../../components/Button'
import ChevronRightIcon from '../../../assets/icons/feather-react/ChevronRightIcon'

import renderMarkup from '../../../utilities/renderMarkup'

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

    const fakeData = [
      { order: 1, element: 'h1', content: 'What is Lorem Ipsum?' },
      {
        order: 2,
        element: 'p',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...'
      },
      { order: 3, element: 'h2', content: 'Where does it come from?' },
      {
        order: 4,
        element: 'p',
        content:
          ' piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure'
      },
      {
        order: 5,
        element: 'p',
        content:
          '.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes'
      }
    ]

    return (
      <div className="route-container">
        {renderMarkup(fakeData)}
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
