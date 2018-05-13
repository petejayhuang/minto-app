import React, { Component } from "react"
import PropTypes from 'prop-types'
import MobileTopNav from "../components/MobileTopNav"
import RouteContainer from "../components/RouteContainer"

class Search extends Component {
  state = {
    inputText: "",
    showSearchUI: false
  }
  render() {
    return (
      <div>
        <MobileTopNav className="flex-row center-center">
          <input
            className="p-1 m-2"
            type="text"
            value={this.state.inputText}
            onChange={e => this.setState({ inputText: e.target.value })}
          />
        </MobileTopNav>
        <RouteContainer />
      </div>
    )
  }
}

Search.defaultProps = {}
Search.propTypes = {}

export default Search
