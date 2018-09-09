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
    <div className="route-container d-flex flex-column align-items-center justify-content-center mt-5 pt-3 pl-3 pr-3">
      <h3 className="text-center">Are you sure?</h3>
      <Button className="mt-2" secondary handleClick={handleYes} text="Yes" />
      <Button className="mt-2" handleClick={handleNo} text="No" />
    </div>
  )
}

export default connect(
  null,
  { logoutUser, redirect }
)(Logout)
