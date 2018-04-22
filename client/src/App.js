import React, { Component } from "react"
import "./stylesheets/App.css"
import { Route } from "react-router-dom"

import Login from "./routes/Login"
import Feed from "./routes/Feed"
import Profile from "./routes/Profile"
import Messages from "./routes/Messages"
import Add from "./routes/Add"
import Search from "./routes/Search"

import MobileNavigation from "./components/mobile/MobileNavigation"

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/login" component={Login} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
        <Route path="/add" component={Add} />
        <Route path="/search" component={Search} />
        <MobileNavigation />
      </div>
    )
  }
}

export default App
