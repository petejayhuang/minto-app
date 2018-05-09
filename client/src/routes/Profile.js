import React from "react"
import RouteContainer from "../components/RouteContainer"
import MobileTopNav from "../components/MobileTopNav"
import TouchableRow from "../components/TouchableRow"

const Profile = props => (
  <div>
    <MobileTopNav className="flex-row center-center">
      <h3>Options</h3>
    </MobileTopNav>

    <RouteContainer noPadding>
      <div className="pl-1 pt-3 pb-1">
        <strong>ACCOUNT</strong>
      </div>
      <TouchableRow text="Edit Profile" />
      <TouchableRow text="Change Password" />
      <TouchableRow borderBottom text="Privacy and Security" />

      <div className="pl-1 pt-3 pb-1">
        <strong>SETTINGS</strong>
      </div>
      <TouchableRow text="Language" />
      <TouchableRow text="Authorised Apps" />
      <TouchableRow borderBottom text="Notifications" />

      <TouchableRow borderBottom className="mt-2" text="Log Out" />
    </RouteContainer>
  </div>
)

export default Profile
