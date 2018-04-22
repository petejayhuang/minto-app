import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

class MobileNavigation extends Component {
  state = {}

  render() {
    return (
      <div>
        <div>
          <Link to="/feed">Feed</Link>
        </div>
        <div>
          <Link to="/search">Search</Link>
        </div>
        <div>
          <Link to="/add">Add</Link>
        </div>
        <div>
          <Link to="/messages">Messages</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    )
  }
}

export default MobileNavigation
