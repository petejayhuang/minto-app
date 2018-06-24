import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"
import { getProductCategories } from "../../actions"

import { Link } from "react-router-dom"

class Search extends Component {
  state = {
    inputText: "",
    showSearchUI: false
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getProductCategories()
    }
  }

  renderCategoryCards = () => {
    return (
      <div>
        {this.props.categories.map(category => (
          <Link to={`/search?category_id=${category.category_id}`}>
            <div>{category.description}</div>
            <div>{category.product_type}</div>
            <hr />
          </Link>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="route-container pl-3 pr-3">
        {this.renderCategoryCards()}
      </div>
    )
  }
}

Search.defaultProps = {}
Search.propTypes = {}

export default connect(
  ({ categories }) => ({ categories }),
  { getProductCategories }
)(Search)
