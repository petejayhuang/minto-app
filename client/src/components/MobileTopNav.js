import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { navItems } from '../config/routing'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  max-width: 600px;
  .navbar {
    position: fixed;
    background-color: white;
    z-index: 800;
    height: 50px;
    border-bottom: 1px solid ${colors.border};
    top: 0;
    width: 100%;
  }
`

class MobileTopNav extends Component {
  renderTopNav = navItem => (
    <Container>
      <div className="navbar d-flex justify-content-between align-items-center">
        <div
          onClick={
            (navItem && navItem.leftOnClick && navItem.leftOnClick) || null
          }
          className="icon-wrapper justify-content-start"
        >
          {navItem && navItem.left && navItem.left}
        </div>
        <div
          className="text-center"
          onClick={() =>
            (navItem && navItem.middleOnClick && navItem.middleOnClick) || null
          }
        >
          {navItem && navItem.middle}
        </div>
        <div
          onClick={
            (navItem && navItem.rightOnClick && navItem.rightOnClick) || null
          }
          className="icon-wrapper d-flex flex-row justify-content-end"
        >
          {navItem && navItem.right && navItem.right}
        </div>
      </div>
    </Container>
  )

  render() {
    return <div>{this.renderTopNav(navItems(this.props))}</div>
  }
}

const mapStateToProps = ({ routing }) => ({ routing })

export default connect(
  mapStateToProps,
  null
)(withRouter(MobileTopNav))
