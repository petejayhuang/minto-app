import React from 'react'
import TouchableRow from '../../components/TouchableRow'

const SettingsList = () => (
  <div className="route-container">
    <TouchableRow to="/settings/addresses" text="Addresses" />
    <TouchableRow to="/settings/likes" text="Liked items" />
    <TouchableRow to="/settings/update-account" text="Update account" />
    <TouchableRow borderBottom to="/settings/logout" text="Log out" />
    <div className="pl-3 mt-5 text-center">
      We'd love to hear your feedback.{' '}
      <a className="highlighted" href="mailto:hello@minto.app">
        Email us
      </a>
    </div>
  </div>
)

export default SettingsList
