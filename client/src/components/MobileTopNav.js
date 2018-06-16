import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import navItems from "../config/navItems"

import LoadingLine from "./LoadingLine"
import { colors } from "../styles/styleVariables"

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
    .icon-wrapper {
      width: 60px;
    }
  }
`

class MobileTopNav extends Component {
  renderTopNav = navItem => (
    <Container>
      <div className="navbar d-flex justify-content-between align-items-center">
        <div
          onClick={() => (navItem.leftOnClick && navItem.leftOnClick) || null}
          className="pl-2 icon-wrapper justify-content-start"
        >
          {navItem.left && navItem.left}
        </div>
        <div
          onClick={() =>
            (navItem.middleOnClick && navItem.middleOnClick) || null
          }
        >
          {navItem.middle}
        </div>
        <div
          onClick={() => (navItem.rightOnClick && navItem.rightOnClick) || null}
          className="pr-2 icon-wrapper flex-row justify-content-end"
        >
          {navItem.right && navItem.right}
        </div>
      </div>
    </Container>
  )

  render() {
    const {
      ui,
      routing: {
        location: { pathname }
      }
    } = this.props
    return (
      <div>
        {ui.loadingLine && <LoadingLine />}
        {this.renderTopNav(navItems[pathname])}
      </div>
    )
  }
}

const mapStateToProps = ({ routing, ui }) => ({ routing, ui })

MobileTopNav.propTypes = {
  location: PropTypes.object,
  ui: PropTypes.object
}

MobileTopNav.defaultProps = {}

export default connect(mapStateToProps)(withRouter(MobileTopNav))
