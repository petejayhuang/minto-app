import React from "react"
import { RouteWithSubRoutes } from "../../utilities/renderRoutes"

const Settings = props => (
  <div className="route-container">
    {props.routes.map(route => {
      const { exact, path, component } = route
      return <RouteWithSubRoutes key={path} exact={exact} {...route} />
    })}
  </div>
)
export default Settings
