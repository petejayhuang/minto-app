import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Route, withRouter } from "react-router-dom"

// routes
import Add from "./routes/Add"
import Feed from "./routes/Feed"
import Landing from "./routes/Landing"
import Messages from "./routes/Messages"
import Profile from "./routes/Profile"
import Search from "./routes/Search"

// components
import MobileTopNav from "./components/MobileTopNav"
import MobileBottomNav from "./components/MobileBottomNav"
import LoadingOverlay from "./components/LoadingOverlay"
import ErrorOverlay from "./components/ErrorOverlay"

// styles
import "./styles/App.css"
import styled from "styled-components"
import { colors } from "./styles/styleVariables"

const AppContainer = styled.div`
  input[type="text"] {
    border: 1px solid ${colors.border};
    width: 100%;
    padding: 5px;
  }
`

class App extends Component {
  render() {
    const { routing, ui, error } = this.props
    const isHomeRoute = routing.location.pathname !== "/"
    return (
      <AppContainer>
        {ui.showLoadingOverlay && <LoadingOverlay />}
        {error && <ErrorOverlay />}
        {isHomeRoute && <MobileTopNav />}
        <Route exact path="/" component={Landing} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
        <Route path="/add" component={Add} />
        <Route path="/search" component={Search} />
        {isHomeRoute && <MobileBottomNav />}
      </AppContainer>
    )
  }
}

const mapState = ({ ui, routing, error }) => ({ ui, routing, error })

export default connect(mapState, null)(App)
