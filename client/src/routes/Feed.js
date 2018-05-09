import React from "react"
import RouteContainer from "../components/RouteContainer"
import MobileTopNav from "../components/MobileTopNav"

import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import UserIcon from "../assets/icons/feather-react/UserIcon"

const Feed = props => (
  <div>
    <MobileTopNav className="inner-container flex-row between-center">
      <div className="pl-2">
        <PlusSquareIcon />
      </div>

      <div>
        <h3>jwl</h3>
      </div>

      <div className="pr-2">
        <UserIcon />
      </div>
    </MobileTopNav>

    <RouteContainer />
  </div>
)

export default Feed
