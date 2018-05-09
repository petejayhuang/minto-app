import React from "react"
import MobileTopNav from "../components/MobileTopNav"
import RouteContainer from "../components/RouteContainer"

const Messages = props => (
  <div>
    <MobileTopNav className="flex-row center-center">
      <h3>Messages</h3>
    </MobileTopNav>
    <RouteContainer>Messages</RouteContainer>
  </div>
)

export default Messages
