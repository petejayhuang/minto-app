// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// utils
import renderRoutes from './utilities/renderRoutes'

// styles
import './styles/App.css'
import styled from 'styled-components'
import TopNav from './components/TopNav'

const AppContainer = styled.div``

class App extends Component {
  render() {
    return (
      <AppContainer>
        <TopNav />
        {renderRoutes()}
      </AppContainer>
    )
  }
}

App.propTypes = {}

export default connect(
  null,
  null
)(App)
