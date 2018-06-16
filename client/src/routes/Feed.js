import React from "react"
import PropTypes from "prop-types"
import { feedFakeData } from "../fakeData/feed"
import ProductCard from "../components/ProductCard"

const Feed = props => {
  return (
    <div className="route-container">
      {feedFakeData.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

Feed.defaultProps = {}
Feed.propTypes = {}

export default Feed
