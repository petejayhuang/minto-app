import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { feedFakeData } from "../fakeData/feed"
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
  const { user, images, title, description, id } = props
  return (
    <Container>
      <div className="d-flex align-items-center p-2">
        <img className="profile-image" src={user.profile_image_url} />
        <div className="ml-2">
          <strong>{user.username}</strong>
        </div>
      </div>
      <div>
        <img className="product-image" src={images[0].image_url} />
      </div>
      <div className="p-2 mb-3">
        <LikeButton id={id} />

        <div>
          <strong>{title}</strong>
        </div>
        <div>{`${description.slice(0, 200)}...`}</div>
      </div>
    </Container>
  )
}

ProductCard.propTypes = {}

ProductCard.defaultProps = {}

export default ProductCard
