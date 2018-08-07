// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// utils
import renderRoutes from './utilities/renderRoutes'

// components
import ErrorBoundary from './components/ErrorBoundary'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import LoadingLine from './components/LoadingLine'
import LoadingOverlay from './components/LoadingOverlay'
import MobileBottomNav from './components/MobileBottomNav'
import MobileTopNav from './components/MobileTopNav'
import StoreDrivenRedirect from './components/StoreDrivenRedirect'

// styles
import './styles/App.css'
import styled from 'styled-components'

const AppContainer = styled.div``

class App extends Component {
  render() {
    const {
      routing,
      ui: { redirect, loadingLine, loadingOverlay },
      error,
      success,
      user
    } = this.props

    const isHomeRoute = routing.location.pathname !== '/'
    const userId = user.id

    return (
      <ErrorBoundary>
        <AppContainer>
          {redirect && <StoreDrivenRedirect />}
          {loadingLine && <LoadingLine />}
          {false && <LoadingOverlay />}
          {error && <ErrorNotification />}
          {success && <SuccessNotification />}
          {<MobileTopNav />}

          {renderRoutes()}
          {isHomeRoute && <MobileBottomNav userId={userId} />}
        </AppContainer>
      </ErrorBoundary>
    )
  }
}

const mapState = ({ ui, user, routing, error, success }) => ({
  error,
  routing,
  success,
  ui,
  user
})

App.propTypes = {
  error: PropTypes.object,
  routing: PropTypes.object,
  success: PropTypes.string,
  ui: PropTypes.object
}

export default connect(
  mapState,
  null
)(App)
