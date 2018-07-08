// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// utils

// styles
import './styles/App.css'
import styled from 'styled-components'
import { TopNav } from './components/TopNav'

const AppContainer = styled.div``

class App extends Component {
  render() {
    return (
      <AppContainer>
        <TopNav />
      </AppContainer>
    )
  }
}

const mapState = ({}) => ({})

App.propTypes = {}

export default connect(
  mapState,
  null
)(App)
