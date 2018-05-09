import React from "react"
import MobileTopNav from "../components/MobileTopNav"
import RouteContainer from "../components/RouteContainer"

const Add = props => (
  <div>
    <MobileTopNav className="flex-row center-center">
      <h3>Add an item</h3>
    </MobileTopNav>
    <RouteContainer>Add</RouteContainer>
  </div>
)

export default Add
