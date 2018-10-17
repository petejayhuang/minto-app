import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

import HomeIcon from '../assets/icons/feather-react/HomeIcon'
import SearchIcon from '../assets/icons/feather-react/SearchIcon'
import PlusSquareIcon from '../assets/icons/feather-react/PlusSquareIcon'
import MessageCircleIcon from '../assets/icons/feather-react/MessageCircleIcon'
import UserIcon from '../assets/icons/feather-react/UserIcon'

import { colors } from '../styles/styleVariables'

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

  generateNavigationIcons = () => {
    const {
      user: { id: userId, seller_YN }
    } = this.props

    // const seller_YN = false
    const NAVIGATION_ICONS = [
      {
        component: <HomeIcon />,
        activeComponent: <HomeIcon stroke={colors.primary} />,
        to: '/feed'
      },
      {
        component: <SearchIcon />,
        activeComponent: <SearchIcon stroke={colors.primary} />,
        to: '/search'
      },
      {
        component: <PlusSquareIcon />,
        activeComponent: <PlusSquareIcon stroke={colors.primary} />,
        to: seller_YN ? '/seller-signup' : '/add'
      },
      {
        component: <MessageCircleIcon />,
        activeComponent: <MessageCircleIcon stroke={colors.primary} />,
        to: '/messages'
      },
      {
        component: <UserIcon />,
        activeComponent: <UserIcon stroke={colors.primary} />,
        to: userId ? `/store/${userId}` : '/login'
      }
    ]

    return NAVIGATION_ICONS
  }

  renderIcons = () =>
    this.generateNavigationIcons().map(({ to, component, activeComponent }) => (
      <div
        key={to}
        className="d-flex justify-content-center align-items-center p-1"
      >
        <Link to={to}>
          {this.state.currentPathname === to ? activeComponent : component}
        </Link>
      </div>
    ))

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <div className="inner-container d-flex justify-content-between align-items-center">
          {this.renderIcons()}
        </div>
      </Container>
    )
  }
}

export default compose(
  connect(
    ({ user, routing }) => ({ user, routing }),
    null
  ),
  withRouter
)(MobileBottomNav)
