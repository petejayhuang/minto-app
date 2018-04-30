import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
  position: fixed;
  height: 50px;
  border: 1px solid red;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .inner-container {
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 350px;
  }
  .navigaton-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

class MobileNavigation extends Component {
  state = {}

  render() {
    return (
      <Container>
        <div className="inner-container">
          <div class="navigaton-button">
            <i class="fas fa-lg fa-home" />
            <Link to="/feed">Feed</Link>
          </div>
          <div class="navigaton-button">
            <i class="fas fa-lg fa-search" />
            <Link to="/search">Search</Link>
          </div>
          <div class="navigaton-button">
            <i class="fas fa-lg fa-plus" />
            <Link to="/add">Add</Link>
          </div>
          <div class="navigaton-button">
            <i class="fas fa-lg fa-comment-alt" />
            <Link to="/messages">Messages</Link>
          </div>
          <div class="navigaton-button">
            <i class="fas fa-lg fa-user" />
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </Container>
    )
  }
}

export default MobileNavigation
