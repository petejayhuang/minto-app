import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";

import {
  getProductCategories,
  getSearchResults,
  resetSearchResults
} from "../../actions";
import { generateQueryStringFromObject } from "../../utilities/generateQueryStringFromObject";

import Button from "../../components/Button";
import ImageGrid from "../../components/ImageGrid";

const Container = styled.div``;

class Search extends Component {
  initialState = {
    page: 1,
    limit: 4,
    category_id: null,
    description: null,
    searchTouched: false
  };

  state = { ...this.initialState };

  componentDidMount() {
    if (this.props.categories.length === 0) this.props.getProductCategories();
    this.handleResetSearch();
  }

  handleInputChange = e => this.setState({ description: e.target.value });

  handleOptionSelect = value => this.setState({ category_id: value });

  loadMoreSearchResults = () => {
    const newState = { ...this.state, page: this.state.page + 1 };
    const queryString = generateQueryStringFromObject(newState);
    this.setState({ ...newState });

    this.props.getSearchResults({
      queryString,
      page: this.state.page
    });
  };

  handleResetSearch = () => {
    this.setState({ ...this.initialState });
    this.props.resetSearchResults();
  };

  handleSearch = () => {
    const queryString = generateQueryStringFromObject(this.state);
    this.props.getSearchResults({ queryString, page: this.state.page });
    this.setState({ searchTouched: true });
  };
  render() {
    const {
      search,
      ui: { loadingLine }
    } = this.props;
    const { searchTouched } = this.state;
    return (
      <Container className="route-container d-flex flex-column justify-content-center align-items-center pl-3 pr-3">
        <h3>What are you looking for?</h3>

        <input
          placeholder="e.g. ruby ring"
          type="text"
          className="mt-3 mb-3"
          onChange={this.handleInputChange}
        />

        <Dropdown
          handleSelect={this.handleOptionSelect}
          dropdownItems={this.props.categories}
        />

        {search.length > 0 && searchTouched ? (
          <div className="d-flex flex-column align-items-center">
            <Button
              secondary
              className="mt-3 mb-3"
              onClick={this.handleResetSearch}
              text="reset search"
            />
            <ImageGrid products={search} />

            <Button
              loading={loadingLine}
              handleClick={this.loadMoreSearchResults}
              className="mt-3 mb-3"
              text="View more results"
            />
          </div>
        ) : (
          <Button
            loading={loadingLine}
            className="mt-3 mb-3"
            onClick={this.handleSearch}
            text="Search"
          />
        )}
        {this.state.searchTouched &&
          search.length === 0 &&
          !loadingLine && <div>No search results </div>}
      </Container>
    );
  }
}

export default connect(
  ({ categories, search, ui }) => ({ categories, search, ui }),
  {
    getProductCategories,
    getSearchResults,
    resetSearchResults
  }
)(Search);
