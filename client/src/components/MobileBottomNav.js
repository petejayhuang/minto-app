import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { store } from '../config/redux'

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

  shouldComponentUpdate(nextProps) {
    // TODO!

    const shouldUpdate = !!nextProps.user.id === !!this.props.user.id

    return shouldUpdate
  }

  state = {
    currentPathname: this.props.location.pathname
  }

  NAVIGATION_ICONS = [
    {
      component: <HomeIcon />,
      activeComponent: <HomeIcon strokeWidth="3" />,
      to: '/feed'
    },
    {
      component: <SearchIcon />,
      activeComponent: <SearchIcon strokeWidth="3" />,
      to: '/search'
    },
    {
      component: <PlusSquareIcon />,
      activeComponent: <PlusSquareIcon strokeWidth="3" />,
      to: '/add'
    },
    {
      component: <MessageCircleIcon />,
      activeComponent: <MessageCircleIcon strokeWidth="3" />,
      to: '/messages'
    },
    {
      component: <UserIcon />,
      activeComponent: <UserIcon strokeWidth="3" />,
      to: this.props.userId ? `/store/${this.props.userId}` : '/login'
    }
  ]

  renderIcons = () =>
    this.NAVIGATION_ICONS.map(({ to, component, activeComponent }) => (
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
    console.log(
      '============================= <MobileBottomNav/> render ============================= '
    )
    console.log(
      'LINK goes:',
      store.getState().user.id ? `/store/${store.getState().user.id}` : '/login'
    )
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <div className="inner-container d-flex justify-content-between align-items-center">
          {this.renderIcons()}
        </div>
      </Container>
    )
  }
}

export default connect(
  ({ user, routing }) => ({ user, routing }),
  null
)(withRouter(MobileBottomNav))
