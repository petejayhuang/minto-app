import React from 'react'
import { connect } from 'react-redux'
import TouchableRow from '../../components/TouchableRow'

const SettingsList = props => (
  <div className="route-container">
    <TouchableRow to="/settings/logout" borderBottom text="Log out" />
    <div className="pl-3 mt-5 text-center">
      Got feedback? <a href="mailto:creators@minto.app">Email us</a>
    </div>
  </div>
)
export default connect(({ user }) => ({ user }))(SettingsList)
