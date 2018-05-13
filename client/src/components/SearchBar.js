import React, { Component } from "react"
import PropTypes from "prop-types"

class SearchBar extends Component {
  state = {
    inputText: "",
    showSearchUI: false
  }
  render() {
    return (
      <div>
        <input
          className="p-1"
          type="text"
          value={this.state.inputText}
          onChange={e => this.setState({ inputText: e.target.value })}
        />
      </div>
    )
  }
}

SearchBar.propTypes = {}

SearchBar.defaultProps = {}

export default SearchBar
