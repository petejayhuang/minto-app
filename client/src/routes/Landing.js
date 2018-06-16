import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { colors } from "../styles/styleVariables"
import fbLogo from "../assets/icons/social/fb-logo-white-58.svg"

const FacebookSignInButton = styled.div`
  background-color: ${colors.facebook};
  color: white;
  img {
    width: 25px;
  }
`

const Add = props => (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <h1>Julia</h1>
    <h3 className="text-center">
      Buy beautiful luxury jewellery from people like you
    </h3>
    <Link to="/feed">
      <FacebookSignInButton className="d-flex justify-content-center align-items-center border-rounded p-3">
        <img alt="facebook login button" src={fbLogo} />
        <p className="p-0 m-0 ml-2">Login with Facebook</p>
      </FacebookSignInButton>
    </Link>
    <div>Sign up with Facebook</div>
  </div>
)

Add.defaultProps = {}
Add.propTypes = {}

export default Add
