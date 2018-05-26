import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { toggleUi } from "../actions/ui"

import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import SettingsIcon from "../assets/icons/feather-react/SettingsIcon"
import LoadingLine from "./LoadingLine"
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
    middle: <SearchBar />,
    middleOnClick: () => {}
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
    leftOnClick: toggleUi("showSettings"),
    middle: <h3>Profile</h3>
  }
}

class MobileTopNav extends Component {
  renderTopNav = (dispatch, navConfig) => (
    <Container className="flex-row between-center">
      <div
        onClick={() => dispatch(navConfig.leftOnClick) || null}
        className="pl-2 icon-wrapper flex-flow justify-start"
      >
        {navConfig.left && navConfig.left}
      </div>
      <div>{navConfig.middle}</div>
      <div
        onClick={() => dispatch(navConfig.rightOnClick) || null}
        className="pr-2 icon-wrapper flex-row justify-end"
      >
        {navConfig.right && navConfig.right}
      </div>
    </Container>
  )

  render() {
    const { ui } = this.props
    console.log(ui)
    return (
      <div>
        {ui.showLoadingLine && <LoadingLine />}
        {this.renderTopNav(
          this.props.dispatch,
          navConfigs[this.props.routing.location.pathname]
        )}
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
