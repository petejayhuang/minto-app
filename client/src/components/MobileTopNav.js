import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import SettingsIcon from "../assets/icons/feather-react/SettingsIcon"
import LoadingBar from "./LoadingLine"
import SearchBar from "./SearchBar"
import { colors } from "../styles/styleVariables"

const Container = styled.div`
  position: fixed;
  background-color: white;
  height: 50px;
  border-bottom: 1px solid ${colors.border};
  top: 0;
  width: 100vw;
  .icon-wrapper {
    width: 60px;
  }
`

const navConfigs = {
  "/feed": {
    left: <PlusSquareIcon />,
    middle: <h3>jwl</h3>,
    right: <PlusSquareIcon />
  },
  "/search": {
    middle: <SearchBar />
  },
  "/add": {
    left: <PlusSquareIcon />,
    middle: <h3>Add</h3>
  },
  "/messages": {
    left: <PlusSquareIcon />,
    middle: <h3>Messages</h3>
  },
  "/profile": {
    left: <SettingsIcon />,
    middle: <h3>Profile</h3>
  }
}

class MobileTopNav extends Component {
  renderTopNav = navConfig => {
    return (
      <Container className="flex-row between-center">
        <div className="pl-2 icon-wrapper flex-flow justify-start">
          {navConfig.left && navConfig.left}
        </div>
        <div className="">{navConfig.middle}</div>
        <div className="pr-2 icon-wrapper flex-row justify-end">
          {navConfig.right && navConfig.right}
        </div>
      </Container>
    )
  }

  render() {
    return (
      <div>
        {false && <LoadingBar />}
        {this.renderTopNav(navConfigs[this.props.location.pathname])}
      </div>
    )
  }
}

export default withRouter(MobileTopNav)
