import React, { Component } from 'react'
import { getUsers } from '../../actions'
import { connect } from 'react-redux'
import { renderTable } from '../../utilities/renderTable'

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {renderTable({
              values: this.props.users,
              match: this.props.match
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ users }) => ({ users: users.list }),
  { getUsers }
)(Users)
