import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import { logoutUser, redirect } from '../../actions'

const Logout = props => {
  const handleYes = () => {
    
    props.logoutUser()
  }

  const handleNo = () => {
    props.redirect('/settings')
  }

  return (
    <div className="route-container d-flex flex-column align-items-center justify-content-center mt-5 pl-3 pr-3">
      Are you sure?
      <Button className="mt-2" secondary handleClick={handleYes} text="yes" />
      <Button className="mt-2" handleClick={handleNo} text="no" />
    </div>
  )
}

export default connect(
  null,
  { logoutUser, redirect }
)(Logout)
