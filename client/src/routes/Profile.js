import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { getUser } from "../actions"
import SecondaryButton from "../components/SecondaryButton"
import ImageGrid from "../components/ImageGrid"
import Settings from "./Settings"

class Profile extends Component {
  componentDidMount() {
    // only async fetch if there isn't some data in there
    if (!this.props.user.email) {
      this.props.getUser(1)
    }
  }

  render() {
    return (
      <div>
        <div className="route-container inner-container">
          <div className="d-flex">
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
              <SecondaryButton text="Follow" />
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <strong>{this.props.user.total_products}</strong>
              <p className="m-0">items</p>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <strong>{this.props.user.total_followers}</strong>
              <p className="m-0">followers</p>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <strong>{this.props.user.total_following}</strong>
              <p className="m-0">following</p>
            </div>
          </div>
        </div>

        <ImageGrid />
      </div>
    )
  }
}

const mapStateToProps = ({ user, ui }) => ({ user, ui })

Profile.defaultProps = {}
Profile.propTypes = {}

export default connect(
  mapStateToProps,
  { getUser }
)(Profile)
