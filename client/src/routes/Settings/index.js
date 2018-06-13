import React from 'react'
import TouchableRow from '../../components/TouchableRow'
import RouteContainer from '../../components/RouteContainer'

const Profile = () => (
  <RouteContainer>
    <div className="pl-1 pt-3 pb-1">
      <strong>ACCOUNT</strong>
    </div>

    <TouchableRow to="/settings/edit-profile" text="Edit Profile" />

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
)

export default Profile
