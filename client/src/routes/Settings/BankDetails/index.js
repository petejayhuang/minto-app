import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { createBankAccount } from '../../../actions/user'

import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'

class Addresses extends Component {
  state = {
    showForm: false,
    bank_account_number: '',
    bank_sort_code: ''
  }

  showForm = () => this.setState({ showForm: true })

  renderBankAccountDetails = () => {
    const { bank_account_number, bank_sort_code } = this.props.user
    return (
      <Fragment>
        Sort code: {bank_sort_code}, Account Number: {bank_account_number}
      </Fragment>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bank_account_number, bank_sort_code } = this.state
    const body = { bank_account_number, bank_sort_code }

    this.props.createBankAccount(body)
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  renderBankAccountForm = () => {
    const { bank_account_number, bank_sort_code } = this.state
    const {
      ui: { loadingLine }
    } = this.props
    return (
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={this.handleSubmit}
      >
        <TextInput
          label="Bank Account Number"
          handleChange={this.handleInputChange}
          name="bank_account_number"
          required
          value={bank_account_number}
        />
        <TextInput
          label="Bank Sort Code"
          handleChange={this.handleInputChange}
          name="bank_sort_code"
          required
          value={bank_sort_code}
        />
        <Button
          className="mt-3"
          text="Add bank account"
          submit
          loading={loadingLine}
        />
      </form>
    )
  }

  render() {
    const { showForm } = this.state
    const { user } = this.props
    return (
      <div className="route-container p-3">
        {!user.bank_account_number ? (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="text-center">
              You haven't added any bank account details yet, how will you get
              paid?!
            </p>
            {!showForm && (
              <Button onClick={this.showForm} text="Add UK bank account" />
            )}
          </div>
        ) : (
          this.renderBankAccountDetails()
        )}

        {showForm && this.renderBankAccountForm()}
      </div>
    )
  }
}

export default connect(
  ({ user, ui }) => ({ user, ui }),
  { createBankAccount }
)(Addresses)
