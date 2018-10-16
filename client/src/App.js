// libraries
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import { KEYS } from './config/constants'
import { withRouter } from 'react-router-dom'

// utils
import renderRoutes from './utilities/renderRoutes'

// components
import ErrorBoundary from './components/ErrorBoundary'
import LoadingLine from './components/LoadingLine'
import LoadingOverlay from './components/LoadingOverlay'
import MobileBottomNav from './components/MobileBottomNav'
import MobileTopNav from './components/MobileTopNav'
import Notification from './components/Notification'
import StoreDrivenRedirect from './components/StoreDrivenRedirect'

// styles
import './styles/App.css'

const App = props => {
  const {
    error,
    ui: { loadingLine, redirect },
    success
  } = props
  return (
    <ErrorBoundary>
      <StripeProvider apiKey={KEYS.STRIPE_PUBLISHABLE_KEY}>
        <div>
          {redirect && <StoreDrivenRedirect />}
          {loadingLine && <LoadingLine />}
          {false && <LoadingOverlay />}
          {(success || error) && <Notification />}
          <MobileTopNav history={props.history} />
          {renderRoutes()}
          {<MobileBottomNav />}
        </div>
      </StripeProvider>
    </ErrorBoundary>
  )
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

export default compose(
  withRouter,
  connect(
    mapState,
    null
  )
)(App)
