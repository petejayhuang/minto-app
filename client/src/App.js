import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./styles/App.css";

import Add from "./routes/Add";
import Feed from "./routes/Feed";
import Landing from "./routes/Landing";
import Messages from "./routes/Messages";
import Profile from "./routes/Profile";
import Search from "./routes/Search";

import MobileBottomNav from "./components/MobileBottomNav";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
        <Route path="/add" component={Add} />
        <Route path="/search" component={Search} />
        {this.props.location.pathname !== "/" && <MobileBottomNav />}
      </div>
    );
  }
}

export default withRouter(App);
