import React from 'react'
import { connect } from 'react-redux'
import { logoutUser, redirect } from '../../actions'

const Logout = props => {
  const handleYes = () => {
    console.log('handle yes')
    props.logoutUser()
  }

  const handleNo = () => {
    props.redirect('/settings')
  }

  return (
    <div className="route-container pl-3 pr-3">
      Are you sure?
      <button onClick={handleYes}>yes</button>
      <button onClick={handleNo}>no</button>
    </div>
  )
}

export default connect(
  null,
  { logoutUser, redirect }
)(Logout)
