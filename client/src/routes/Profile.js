import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { getUser } from "../actions"
import SecondaryButton from "../components/SecondaryButton"
import ImageGrid from "../components/ImageGrid"
import RouteContainer from "../components/RouteContainer"
import Settings from "./Settings"

class Profile extends Component {
  componentDidMount() {
    // only async if there isn't some data in there
    if (!this.props.user.email) {
      this.props.getUser(1)
    }
  }

  render() {
    return (
      <div>
        {this.props.ui.showSettings ? (
          <RouteContainer noPadding>
            <Settings />
          </RouteContainer>
        ) : (
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
                  <SecondaryButton text="Follow" />
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
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user, ui }) => ({ user, ui })

Profile.defaultProps = {}
Profile.propTypes = {}

export default connect(mapStateToProps, { getUser })(Profile)
