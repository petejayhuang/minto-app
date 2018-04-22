import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

class MobileNavigation extends Component {
  state = {}

  render() {
    return (
      <Container>
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
      </Container>
    )
  }
}

export default MobileNavigation
