import React from "react"
import styled from "styled-components"
import { colors } from "../styles/styleVariables"
import fbLogo from "../assets/icons/social/fb-logo-white-58.svg"

const FacebookSignInButton = styled.div`
  background-color: ${colors.facebook};
  width: 200px;
  color: white;
  img {
    width: 25px;
  }
`

const Add = props => (
  <div className="flex-column center-center">
    <h1>Julia</h1>
    <h3 className="text-center">
      Buy beautiful luxury jewellery from people like you
    </h3>
    <FacebookSignInButton className="flex-row center-center border-rounded p-1">
      <img alt="facebook login button" src={fbLogo} />
      <p className="ml-2">Login with Facebook</p>
    </FacebookSignInButton>
    <div>Sign up with Facebook</div>
  </div>
)

export default Add
