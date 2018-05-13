import React, { Component } from "react"
// import styled from "styled-components"
import RouteContainer from "../components/RouteContainer"
import ImageGrid from "../components/ImageGrid"
import { connect } from "react-redux"
import { getUser } from "../actions"
// import Settings from "./Settings"

class Profile extends Component {
  state = {
    showSettings: false
  }

  componentDidMount() {
    this.props.getUser(1)
  }

  render() {
    return (
      <div>
        <RouteContainer>
          <div className="flex-row">
            <div className="profile-image-container">
              <img
                alt="profile"
                className="profile-image"
                src={`${this.props.user.profile_URL}`}
              />
            </div>

            <div className="ml-2">
              <div>
                <h3>{this.props.user.username}</h3>
              </div>
              <div>action button</div>
            </div>
          </div>

          <div className="mt-2 flex-row between-center">
            <div className="flex-column center-center">
              <strong>{this.props.user.total_products}</strong>
              <p className="m-0">items</p>
            </div>

            <div className="flex-column center-center">
              <strong>{this.props.user.total_followers}</strong>
              <p className="m-0">followers</p>
            </div>

            <div className="flex-column center-center">
              <strong>{this.props.user.total_following}</strong>
              <p className="m-0">following</p>
            </div>
          </div>
        </RouteContainer>

        <ImageGrid />

        {/* <RouteContainer noPadding>
          {this.state.showSettings ? <Settings /> : ""}
        </RouteContainer> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { getUser })(Profile)
