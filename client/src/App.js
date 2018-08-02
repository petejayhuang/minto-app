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
import { colors } from './styles/styleVariables'

const AppContainer = styled.div`
  input[type='text'] {
    border: 1px solid ${colors.border};
    width: 100%;
    padding: 5px;
  }
`

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
    const isLoggedIn = user.user_id
    return (
      <ErrorBoundary>
        <AppContainer>
          {redirect && <StoreDrivenRedirect />}
          {loadingLine && <LoadingLine />}
          {loadingOverlay && <LoadingOverlay />}
          {error && <ErrorNotification />}
          {success && <SuccessNotification />}
          {<MobileTopNav />}

          {renderRoutes()}
          {isHomeRoute && <MobileBottomNav />}
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
