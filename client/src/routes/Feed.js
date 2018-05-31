import React, { Component } from "react"
// import PropTypes from "prop-types"
import RouteContainer from "../components/RouteContainer"
import ProductCard from "../components/ProductCard"

const products = [
  {
    user: {
      username: "petejayhuang",
      profile_image_url:
        "https://s3.eu-west-2.amazonaws.com/jwl-public/petejayhuang/39080122-61de-11e8-9359-0b9f47afe558.png"
    },
    product_description:
      "A beautiful and traditionaal Antique Diamond Engagement ring with diamond shoulders, a 40pt old english brilliant cut",
    likes: 232,
    image_url:
      "https://s3.eu-west-2.amazonaws.com/jwl-public/petejayhuang/e5b5a1b0-6513-11e8-ad82-11e3b4c11fd7.png",
    comments: [
      { user: "petejayhuang", comment: "what a beautiful ring!" },
      { user: "petejayhuang3", comment: "want want want" }
    ]
  },
  {
    user: {
      username: "petejayhuang",
      profile_image_url:
        "https://s3.eu-west-2.amazonaws.com/jwl-public/petejayhuang/39080122-61de-11e8-9359-0b9f47afe558.png"
    },
    product_description:
      "A beautiful and traditional Antique Diamond Engagement ring with diamond shoulders, a 40pt old english brilliant cut",
    likes: 232,
    image_url:
      "https://s3.eu-west-2.amazonaws.com/jwl-public/petejayhuang/e5b5a1b0-6513-11e8-ad82-11e3b4c11fd7.png",
    comments: [
      { user: "petejayhuang", comment: "what a beautiful ring!" },
      { user: "petejayhuang3", comment: "want want want" }
    ]
  }
]

class Feed extends Component {
  renderProductCards = () =>
    products.map(product => (
      <ProductCard key={product.product_description} {...product} />
    ))

  render() {
    return (
      <RouteContainer>
        <div className="flex-column center-center">
          {this.renderProductCards()}
        </div>
      </RouteContainer>
    )
  }
}

Feed.defaultProps = {}
Feed.propTypes = {}

export default Feed
