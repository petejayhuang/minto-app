import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { feedFakeData } from "../fakeData/feed"
import { Link } from "react-router-dom"
import LikeButton from "./LikeButton"

const Container = styled.div`
  .profile-image {
    height: 50px;
    width: 50px;
  }
  .product-image {
    width: 100%;
  }
`

const ProductCard = props => {
  const {
    User,
    Images,
    Prices,
    category_id,
    entry_date,
    description,
    product_id
  } = props
  return (
    <Container>
      <div className="d-flex align-items-center p-2">
        <Link to={`/store/${User.user_id}`}>
          <img
            className="profile-image"
            src="https://pbs.twimg.com/profile_images/419525195540340736/O7lLIrhx_400x400.png"
          />
          <div className="ml-2">
            <strong>{User.username}</strong>
          </div>
        </Link>
      </div>
      <Link to={`/products/${product_id}`}>
        <div>
          <img className="product-image" src={Images[0].image_URL} />
        </div>
      </Link>
      <div className="p-2 mb-3">
        <LikeButton id={product_id} />
        <div>
          <strong>{Prices[0].price}</strong>
        </div>
        <div>{`${description.slice(0, 200)}...`}</div>
      </div>
    </Container>
  )
}

ProductCard.propTypes = {}

ProductCard.defaultProps = {}

export default ProductCard
