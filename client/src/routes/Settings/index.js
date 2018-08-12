import React from 'react'
import TouchableRow from '../../components/TouchableRow'

const SettingsList = props => (
  <div className="route-container">
    <TouchableRow borderBottom to="/settings/logout" text="Log out" />
    <div className="pl-3 mt-5 text-center">
      We'd love to hear your feedback.{' '}
      <a className="highlighted-link" href="mailto:creators@minto.app">
        Email us
      </a>
    </div>
  </div>
)

export default SettingsList
