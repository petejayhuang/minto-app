import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"

import Add from "./routes/Add"
import Feed from "./routes/Feed"
import Landing from "./routes/Landing"
import Messages from "./routes/Messages"
import Profile from "./routes/Profile"
import Search from "./routes/Search"

import MobileTopNav from "./components/MobileTopNav"
import MobileBottomNav from "./components/MobileBottomNav"

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
    return (
      <AppContainer>
        <MobileTopNav />
        <Route exact path="/" component={Landing} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
        <Route path="/add" component={Add} />
        <Route path="/search" component={Search} />
        {this.props.location.pathname !== "/" && <MobileBottomNav />}
      </AppContainer>
    )
  }
}

export default withRouter(App)
