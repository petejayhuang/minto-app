import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="route-container">
      <Link to="/login">Login</Link>
      <h1>Give your unused jewellery a new home.</h1>
      <p>Buy and sell jewellery the modern way.</p>
    </div>
  )
}

export default Landing
