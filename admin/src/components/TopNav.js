import React, { Component } from 'react'
import ChevronDownIcon from '../assets/icons/feather-react/ChevronDownIcon'
import ChevronUpIcon from '../assets/icons/feather-react/ChevronUpIcon'

export class TopNav extends Component {
  state = {
    expanded: false
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        {this.state.expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        {this.state.expanded && (
          <div>
            <ul>
              <li>Users</li>
              <li>Orders</li>
              <li>Products</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}
