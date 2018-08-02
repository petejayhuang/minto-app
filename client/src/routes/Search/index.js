import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductCategories, searchProducts } from '../../actions'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div``

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
            className="text-center"
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
      <Container className="route-container d-flex flex-column align-items-center pl-3 pr-3">
        <label className="pt-3">
          <strong>What are you looking for?</strong>
        </label>
        <input
          type="text"
          onChange={e => this.handleInputChange(e.target.value)}
        />
        <Button
          className="mt-2 mb-5"
          onClick={this.handleClick}
          text="Search"
        />

        {this.renderCategoryCards()}
      </Container>
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
