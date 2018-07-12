import _ from 'lodash'
import React, { Component } from 'react'
import { getUser, updateUser, deleteUser } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Users extends Component {
  state = {
    showEditUserForm: false,
    renderDeleteUserModal: false
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
  }

  handleButtonClick = stateSlice => {
    this.setState({ [stateSlice]: !this.state[stateSlice] })
  }

  handleInputChange = (value, inputName) => {
    this.setState({ [inputName]: value })
  }

  updateUser = () => {
    const values = _.pick(this.state, Object.keys(this.props.user))
    this.props.updateUser({
      id: this.props.user.user_id,
      ...values
    })
  }

  handleDelete = confirmDelete => {
    if (confirmDelete) {
      this.props.deleteUser(this.props.user.user_id)
    } else {
      this.setState({ renderDeleteUserModal: false })
    }
  }

  renderEditUserForm = () => (
    <div>
      {Object.keys(this.props.user).map(key => {
        if (key.indexOf('id') < 0) {
          return (
            <div>
              <label>{key}</label>
              <input
                type="text"
                value={this.state[key] || this.props.user[key]}
                onChange={e => this.handleInputChange(e.target.value, [key])}
              />
            </div>
          )
        }
      })}
      <button onClick={this.updateUser}>update user</button>
    </div>
  )

  renderDeleteUserModal = () => (
    <div>
      are you sure?
      <button onClick={() => this.handleDelete(true)}>yes</button>
      <button onClick={() => this.handleDelete(false)}>no</button>
    </div>
  )

  renderUser = () => {
    if (this.props.user.user_id) {
      const {
        email,
        first_name,
        last_name,
        profile_URL,
        total_followers,
        total_following,
        total_products,
        user_id,
        username
      } = this.props.user
      return (
        <div className="row">
          <div className="col-10">
            <h3>Info Panel</h3>
            <ul>
              <li>{email}</li>
              <li>{first_name}</li>
              <li>{last_name}</li>
              <li>{profile_URL}</li>
              <li>{total_followers}</li>
              <li>{total_following}</li>
              <li>{total_products}</li>
              <li>{user_id}</li>
              <li>{username}</li>
            </ul>
            {this.state.showEditUserForm && this.renderEditUserForm()}
          </div>
          <div className="col-2">
            <h3>Power Panel</h3>
            <button
              onClick={() => this.handleButtonClick('showEditUserForm')}
              className="btn btn-warning mr-3 "
            >
              Edit
            </button>
            <button
              onClick={() => this.handleButtonClick('showDeleteUserModal')}
              className="btn btn-danger"
            >
              Delete
            </button>
            {this.state.showDeleteUserModal && this.renderDeleteUserModal()}
          </div>
        </div>
      )
    }
  }

  render() {
    return <div className="container-fluid">{this.renderUser()}</div>
  }
}

export default connect(
  ({ users }) => ({ user: users.current }),
  { getUser, updateUser, deleteUser }
)(withRouter(Users))
