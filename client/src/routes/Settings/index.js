import React from 'react'
import { connect } from 'react-redux'
import TouchableRow from '../../components/TouchableRow'

const SettingsList = props => (
  <div className="route-container">
    <TouchableRow to={`/store/${props.user.user_id}`} text="My store" />
    <TouchableRow to="/likes" text="Likes" />
    <TouchableRow to="/shopping-cart" text="Shopping cart" />
    <TouchableRow to="/notifications" text="Notifications" />
    <TouchableRow to="/settings/account-details" text="Account details" />
    <TouchableRow to="/orders" text="Order history" />
    <TouchableRow to="/settings/payment-details" text="Payment settings" />
    <TouchableRow text="Chat to us" />
    <TouchableRow to="/settings/logout" borderBottom text="Log out" />
  </div>
)
export default connect(({ user }) => ({ user }))(SettingsList)
