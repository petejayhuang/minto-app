import React from "react"
import { Route } from "react-router-dom"
import appRoutes from "../config/routes"

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

const renderRoutes = () =>
  appRoutes.map(appRoute => {
    const { exact, path, component } = appRoute
    return <RouteWithSubRoutes key={path} exact={exact} {...appRoute} />
  })

export default renderRoutes
