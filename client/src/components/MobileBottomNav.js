import React, { Component } from "react"
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom"

import HomeIcon from "../assets/icons/feather-react/HomeIcon"
import SearchIcon from "../assets/icons/feather-react/SearchIcon"
import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import MessageCircleIcon from "../assets/icons/feather-react/MessageCircleIcon"
import UserIcon from "../assets/icons/feather-react/UserIcon"

import { colors } from "../styles/styleVariables"

const Container = styled.div`
  position: fixed;
  background-color: white;
  height: 50px;
  border-top: 1px solid ${colors.border};
  bottom: 0;
  width: 100vw;
  .inner-container {
    min-width: 360px;
  }
`

const NAVIGATION_ICONS = [
  {
    component: <HomeIcon />,
    activeComponent: <HomeIcon strokeWidth="4" />,
    to: "/feed"
  },
  {
    component: <SearchIcon />,
    activeComponent: <SearchIcon strokeWidth="4" />,
    to: "/search"
  },
  {
    component: <PlusSquareIcon />,
    activeComponent: <PlusSquareIcon strokeWidth="4" />,
    to: "/add"
  },
  {
    component: <MessageCircleIcon />,
    activeComponent: <MessageCircleIcon strokeWidth="4" />,
    to: "/messages"
  },
  {
    component: <UserIcon />,
    activeComponent: <UserIcon strokeWidth="4" />,
    to: "/profile"
  }
]

class MobileBottomNav extends Component {
  // static functions are declared on the class, not the particular instance
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.location.pathname !== prevState.currentPathname
      ? {
          currentPathname: nextProps.location.pathname
        }
      : null
  }

  state = {
    currentPathname: this.props.location.pathname
  }

  renderIcons = () =>
    NAVIGATION_ICONS.map(({ to, component, activeComponent }) => (
      <div key={to} className="flex-row center-center p-1">
        <Link to={to}>
          {this.state.currentPathname === to ? activeComponent : component}
        </Link>
      </div>
    ))

  render() {
    return (
      <Container className="flex-row center-center">
        <div className="inner-container flex-row between-center">
          {this.renderIcons()}
        </div>
      </Container>
    )
  }
}

export default withRouter(MobileBottomNav)
