import axios from "axios"
import React, { Component } from "react"
import { connect } from "react-redux"
import FacebookLogin from "react-facebook-login"
import { URLS } from "../config/constants"
import { authenticateFacebookWithBE } from "../actions"

class Landing extends Component {
  state = { isAuthenticated: false, user: null, token: "" }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null })
  }

  facebookResponse = async fbResponse => {
    const response = await axios({
      method: "post",
      url: `${URLS.SERVER}/auth/facebook`,
      headers: { Authorization: `Bearer ${fbResponse.accessToken}` }
    })
    console.log("response from BE", response)
  }

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout}>Log out</button>
        </div>
      </div>
    ) : (
      <FacebookLogin
        appId="1771048822975022"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.facebookResponse}
      />
    )

    return <div className="App">{content}</div>
  }
}

Landing.defaultProps = {}
Landing.propTypes = {}

export default connect(
  null,
  {
    authenticateFacebookWithBE
  }
)(Landing)
