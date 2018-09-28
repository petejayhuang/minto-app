import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { redirect } from '../../actions'
import Button from '../../components/Button'

const renderIntro = searchParam => {
  switch (searchParam) {
    case '?ref=sell':
      return 'Sell everything!'
    case '?ref=buy':
      return 'Buy buy buy!'
    default:
      return 'Give your unused jewellery a new home.'
  }
}

const Landing = props => (
  <div className="route-container p-3 d-flex flex-column justify-content-center align-items-center">
    <h1 className="text-center mt-5">
      {renderIntro(props.routing.location.search)}
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
    <Link className="mt-2 highlighted" to="/login">
      Login / Signup
    </Link>
  </div>
)

export default connect(
  ({ routing }) => ({ routing }),
  { redirect }
)(Landing)
