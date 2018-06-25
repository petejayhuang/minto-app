import React from 'react'
import TouchableRow from '../../components/TouchableRow'
import { RouteWithSubRoutes } from '../../utilities/renderRoutes'

const SettingsList = props => (
  <div className="route-container">
    <div className="pl-1 pt-3 pb-1">
      <strong>ACCOUNT</strong>
    </div>
    <TouchableRow to="/settings/edit-profile" text="Edit Profile" />
    <TouchableRow to="/settings/change-password" text="Change Password" />
    <TouchableRow to="/orders" text="Your Orders" />
    <TouchableRow borderBottom text="Privacy and Security" />
    <div className="pl-1 pt-3 pb-1">
      <strong>SETTINGS</strong>
    </div>
    <TouchableRow text="Language" />
    <TouchableRow text="Authorised Apps" />
    <TouchableRow borderBottom text="Notifications" />
    <TouchableRow borderBottom className="mt-2" text="Log Out" />
  </div>
)
export default SettingsList
