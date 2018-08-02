import React, { Component } from "react"
// import PropTypes from "prop-types"
// import styled from "styled-components"

import CategoryCard from "../components/CategoryCard"
import MobileTopNav from "../components/MobileTopNav"
import RouteContainer from "../components/RouteContainer"

import NecklaceImage from "../assets/images/necklace.jpeg"
import RingImage from "../assets/images/ring.jpeg"
import BangleImage from "../assets/images/bangle.jpeg"
import WatchImage from "../assets/images/watch.jpeg"

const categoryCards = [
  {
    title: "Necklaces",
    backgroundImage: `url(${NecklaceImage})`
  },
  {
    title: "Rings",
    backgroundImage: `url(${RingImage})`
  },
  {
    title: "Bangles",
    backgroundImage: `url(${BangleImage})`
  },
  {
    title: "Watches",
    backgroundImage: `url(${WatchImage})`
  }
]

class Search extends Component {
  state = {
    inputText: "",
    showSearchUI: false
  }

  renderCategoryCards = () =>
    categoryCards.map(categoryCard => (
      <CategoryCard key={categoryCard.title} {...categoryCard} />
    ))

  render() {
    return (
      <RouteContainer noPadding>{this.renderCategoryCards()}</RouteContainer>
    )
  }
}

Search.defaultProps = {}
Search.propTypes = {}

export default Search
