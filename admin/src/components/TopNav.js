import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutAdmin } from '../actions'
import ChevronDownIcon from '../assets/icons/feather-react/ChevronDownIcon'
import ChevronUpIcon from '../assets/icons/feather-react/ChevronUpIcon'
import { Link } from 'react-router-dom'

class TopNav extends Component {
  state = {
    expanded: true
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleLogOut = () => {
    this.props.dispatch(logoutAdmin)
  }
  render() {
    const { expanded } = this.state
    const loggedIn = localStorage.getItem('x-admin-auth-token')
    return (
      <div className="d-flex justify-content-end" onClick={this.handleClick}>
        {expanded &&
          loggedIn && (
            <div className="d-flex">
              <div className="mr-2" onClick={this.handleLogOut}>
                Logout
              </div>
              <Link className="mr-2" to="/dashboard">
                Dashboard
              </Link>
              <Link className="mr-2" to="/users">
                Users
              </Link>
              <Link className="mr-2" to="/orders">
                Orders
              </Link>
              <Link className="mr-2" to="/products">
                Products
              </Link>
              <Link className="mr-2" to="/categories">
                Categories
              </Link>
            </div>
          )}
        {expanded && loggedIn ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({ dispatch, logoutAdmin })

export default connect(
  null,
  mapDispatchToProps
)(TopNav)
