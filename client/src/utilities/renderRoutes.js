import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routes } from '../config/routing'

const renderRoutes = () => {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  )
}

export default renderRoutes
