import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductCategories, searchProducts } from '../../actions'

import { Link } from 'react-router-dom'

class Search extends Component {
  state = {
    searchInput: ''
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getProductCategories()
    }
  }

  handleInputChange = value => {
    this.setState({ searchInput: value })
  }

  handleClick = () => {
    this.props.searchProducts(`?search=${this.state.searchInput}`)
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
        <label>What are you looking for?</label>
        <input
          type="text"
          onChange={e => this.handleInputChange(e.target.value)}
        />
        <button onClick={this.handleClick}>Search</button>

        {this.renderCategoryCards()}
      </div>
    )
  }
}

Search.defaultProps = {}
Search.propTypes = {}

export default connect(
  ({ categories }) => ({ categories }),
  {
    getProductCategories,
    searchProducts
  }
)(Search)
