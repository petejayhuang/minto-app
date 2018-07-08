import React, { Component } from 'react'
import ChevronDownIcon from '../assets/icons/feather-react/ChevronDownIcon'
import ChevronUpIcon from '../assets/icons/feather-react/ChevronUpIcon'
import { Link } from 'react-router-dom'

export class TopNav extends Component {
  state = {
    expanded: true
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { expanded } = this.state
    return (
      <div className="d-flex justify-content-end" onClick={this.handleClick}>
        {expanded && (
          <div className="d-flex">
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
        {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </div>
    )
  }
}
