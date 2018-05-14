import React, { Component } from "react"
import PropTypes from "prop-types"

class SearchBar extends Component {
  state = {
    inputText: "",
    showSearchUI: false
  }
  handleChange = event => {
    this.setState({ inputText: event.target.value })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          className="p-1"
          value={this.state.inputText}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

SearchBar.propTypes = {}

SearchBar.defaultProps = {}

export default SearchBar
