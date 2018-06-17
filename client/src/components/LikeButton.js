import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import HeartIcon from "../assets/icons/feather-react/HeartIcon"

class LikeButton extends Component {
  state = { showFill: false }

  handleClick = id => {
    this.setState({ showFill: !this.state.showFill })
  }

  render() {
    const { id } = this.props
    return (
      <div onClick={() => this.handleClick(id)}>
        {this.state.showFill ? (
          <HeartIcon fill="red" stroke="red" />
        ) : (
          <HeartIcon />
        )}
      </div>
    )
  }
}

LikeButton.propTypes = {}

LikeButton.defaultProps = {}

export default LikeButton
