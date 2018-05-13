import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { toggleUi } from "../actions/ui"

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

class MobileTopNav extends Component {
  renderTopNav = navConfig => {
    return (
      <Container className="flex-row between-center">
        <div
          onClick={navConfig.leftOnClick || null}
          className="pl-2 icon-wrapper flex-flow justify-start"
        >
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
        leftOnClick: () => {
          this.props.toggleUi("showSettings")
        },
        left: <SettingsIcon />,
        middle: <h3>Profile</h3>
      }
    }

    const { ui } = this.props

    return (
      <div>
        {ui.showLoading && <LoadingBar />}
        {this.props.location.pathname !== "/" &&
          this.renderTopNav(navConfigs[this.props.location.pathname])}
      </div>
    )
  }
}

const mapStateToProps = ({ ui }) => ({ ui })

MobileTopNav.propTypes = {}

MobileTopNav.defaultProps = {}

export default connect(mapStateToProps, { toggleUi })(withRouter(MobileTopNav))
