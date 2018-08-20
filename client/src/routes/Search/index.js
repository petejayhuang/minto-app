import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { compose } from 'redux'
import requireAuth from '../../components/HigherOrder/requireAuth'

import {
  getProductCategories,
  getSearchResults,
  resetSearchResults
} from '../../actions'
import { generateQueryStringFromObject } from '../../utilities/generateQueryStringFromObject'

import Button from '../../components/Button'
import ImageGrid from '../../components/ImageGrid'

const Container = styled.div``

class Search extends Component {
  initialState = {
    page: 1,
    limit: 4,
    category_id: null,
    description: null,
    searchTouched: false
  }

  state = { ...this.initialState }

  componentDidMount() {
    if (this.props.categories.length === 0) this.props.getProductCategories()
    this.handleResetSearch()
  }

  handleInputChange = e => this.setState({ description: e.target.value })

  handleOptionSelect = e => this.setState({ category_id: e.target.value })

  loadMoreSearchResults = () => {
    console.log('loadMoreSearchResults')
    const newState = { ...this.state, page: this.state.page + 1 }
    const queryString = generateQueryStringFromObject(newState)
    this.setState({ ...newState })

    console.log('queryString in Search.js', queryString)

    this.props.getSearchResults({
      queryString,
      page: this.state.page
    })
  }

  handleResetSearch = () => {
    this.setState({ ...this.initialState })
    this.props.resetSearchResults()
  }

  handleSearch = () => {
    const queryString = generateQueryStringFromObject(this.state)
    this.props.getSearchResults({ queryString, page: this.state.page })
    this.setState({ searchTouched: true })
  }

  renderCategoryDropdown = () => (
    <select onChange={this.handleOptionSelect}>
      <option value="" key="0">
        All jewellery
      </option>
      {this.props.categories.map(category => {
        const { category_id, product_type } = category
        return (
          <option value={category_id} key={category_id}>
            {product_type}
          </option>
        )
      })}
    </select>
  )

  render() {
    const { search } = this.props
    return (
      <Container className="route-container d-flex flex-column align-items-center pl-3 pr-3">
        <label className="pt-3">
          <strong>What are you looking for?</strong>
        </label>
        <input type="text" className="mb-3" onChange={this.handleInputChange} />
        {this.renderCategoryDropdown()}

        {search.length > 0 && this.state.searchTouched ? (
          <div className="d-flex flex-column align-items-center">
            <Button
              secondary
              className="mt-3 mb-3"
              onClick={this.handleResetSearch}
              text="reset search"
            />
            <ImageGrid products={search} />

            <Button
              loading={this.props.ui.loadingLine}
              handleClick={this.loadMoreSearchResults}
              className="mt-3 mb-3"
              text="view more results"
            />
          </div>
        ) : (
          <Button
            loading={this.props.ui.loadingLine}
            className="mt-3 mb-3"
            onClick={this.handleSearch}
            text="search"
          />
        )}
        {this.state.searchTouched &&
          search.length === 0 &&
          !this.props.ui.loadingLine && <div>No search results </div>}
      </Container>
    )
  }
}

export default compose(
  connect(
    ({ categories, search, ui }) => ({ categories, search, ui }),
    {
      getProductCategories,
      getSearchResults,
      resetSearchResults
    }
  ),
  requireAuth
)(Search)
