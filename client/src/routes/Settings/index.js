import React from 'react'
import { connect } from 'react-redux'
import TouchableRow from '../../components/TouchableRow'

const SettingsList = props => (
  <div className="route-container">
    <TouchableRow to="/become-a-seller" text="Become a seller" />
    <TouchableRow text="Chat to us" />
    <TouchableRow to="/settings/logout" borderBottom text="Log out" />
  </div>
)
export default connect(({ user }) => ({ user }))(SettingsList)
