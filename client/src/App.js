// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import { KEYS } from './config/constants'

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
      ui: { redirect, loadingLine },
      error,
      success,
      user: { id }
    } = this.props

    return (
      <ErrorBoundary>
        <StripeProvider apiKey={KEYS.STRIPE_PUBLISHABLE_KEY}>
          <AppContainer>
            {redirect && <StoreDrivenRedirect />}
            {loadingLine && <LoadingLine />}
            {false && <LoadingOverlay />}
            {error && <ErrorNotification />}
            {success && <SuccessNotification />}
            {<MobileTopNav />}
            {renderRoutes()}
            {<MobileBottomNav userId={id} />}
          </AppContainer>
        </StripeProvider>
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
