import React from 'react'
import { Route } from 'react-router-dom'
import appRoutes from '../config/routes'

const renderRoutes = () =>
  appRoutes.map(appRoute => {
    const { exact, path, component } = appRoute
    return <Route key={path} exact={exact} path={path} component={component} />
  })

export default renderRoutes
