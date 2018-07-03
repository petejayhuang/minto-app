import React, { Component } from "react"
import { connect } from "react-redux"
import { getProductCategories } from "../../actions"

import { Link } from "react-router-dom"

class Search extends Component {
  state = {
    inputText: ""
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
          <Link
            key={category.category_id}
            to={`/search?category_id=${category.category_id}`}
          >
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
