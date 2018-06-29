import React, { Component } from "react"
import { connect } from "react-redux"
import { logoutUser, redirect } from "../../actions"

class Logout extends Component {
  handleYes = () => {
    this.props.logoutUser()
  }

  handleNo = () => {
    this.props.redirect("/settings")
  }

  render() {
    console.log("this.props", this.props)
    return (
      <div className="route-container pl-3 pr-3">
        Are you sure?
        <button onClick={this.handleYes}>yes</button>
        <button onClick={this.handleNo}>no</button>
      </div>
    )
  }
}

export default connect(
  null,
  { logoutUser, redirect }
)(Logout)
