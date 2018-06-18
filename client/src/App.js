// libraries
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// utils
import renderRoutes from "./utilities/renderRoutes"

// components
import ErrorBoundary from "./components/ErrorBoundary"
import ErrorNotification from "./components/ErrorNotification"
import LoadingOverlay from "./components/LoadingOverlay"
import MobileBottomNav from "./components/MobileBottomNav"
import MobileTopNav from "./components/MobileTopNav"
import StoreDrivenRedirect from "./components/StoreDrivenRedirect"

// styles
import "./styles/App.css"
import styled from "styled-components"
import { colors } from "./styles/styleVariables"

const AppContainer = styled.div`
  input[type="text"] {
    border: 1px solid ${colors.border};
    width: 100%;
    padding: 5px;
  }
`

class App extends Component {
  render() {
    const {
      routing,
      ui: { redirect, loadingOverlay },
      error
    } = this.props
    const isHomeRoute = routing.location.pathname !== "/"
    return (
      <ErrorBoundary>
        <AppContainer>
          {redirect && <StoreDrivenRedirect />}
          {loadingOverlay && <LoadingOverlay />}
          {error && <ErrorNotification />}
          {<MobileBottomNav />}
          {renderRoutes()}
          {isHomeRoute && <MobileBottomNav />}
        </AppContainer>
      </ErrorBoundary>
    )
  }
}

const mapState = ({ ui, routing, error }) => ({ ui, routing, error })

App.propTypes = {
  ui: PropTypes.object,
  routing: PropTypes.object,
  error: PropTypes.object
}

export default connect(
  mapState,
  null
)(App)
