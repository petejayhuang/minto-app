import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { redirect } from '../../actions'
import Button from '../../components/Button'

const Landing = props => {
  return (
    <div className="route-container d-flex flex-column align-items-center">
      <h1 className="text-center mt-5">
        Give your unused jewellery a new home.
      </h1>
      <p className="text-center ">Buy and sell jewellery the modern way.</p>
      <Button
        secondary
        handleClick={() => props.redirect('/feed')}
        text="View featured items"
      />
      <Button
        className="mt-3"
        handleClick={() => props.redirect('/search')}
        text="Search items"
      />
      <Link className="mt-3" to="/login">
        Login
      </Link>
    </div>
  )
}

export default connect(
  null,
  { redirect }
)(Landing)
