import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = props => (
  <div className="route-container pl-3 pr-3">
    <div className="d-flex flex-column align-items-center">
      <h1 className="mt-5 text-center">Whoops this page doesn't exist!</h1>
      <Link className="mt-3 highlighted-link" to="/">
        Click here to go back to the homepage
      </Link>
    </div>
  </div>
)

NotFound.defaultProps = {}
NotFound.propTypes = {}

export default NotFound
