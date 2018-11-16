import React from 'react'
import { number, string, object, array } from 'prop-types'
import styled from 'styled-components'
import { colors } from '../styles/styleVariables'
import { Link } from 'react-router-dom'
import { renderHashtags } from '../utilities/renderHashtags'

const Container = styled.div`
  max-width: 600px;
  border: 1px solid ${colors.border};
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: white;
  .profile-image {
    height: 50px;
    width: 50px;
  }
  .product-image {
    border-top: 1px solid ${colors.borderLight};
    border-bottom: 1px solid ${colors.borderLight};
  }
`

const ProductCard = props => {
  const { User, images, price, description, id, title, hashtags } = props
  return (
    <Container>
      <div className="d-flex align-items-center p-2">
        <Link
          className="d-flex align-items-center"
          to={`/store/${User.user_id}`}
        >
          <img
            className="ml-1 profile-image"
            alt="profile"
            src={User.profile_URL}
          />
          <div className="ml-3">
            <strong>{User.username}</strong>
          </div>
        </Link>
      </div>
      <Link to={`/products/${id}`}>
        <img
          className="product-image img-fluid"
          key={id}
          alt="product"
          src={images[0].image_URL}
        />
      </Link>
      <Link to={`/products/${id}`}>
        <div className="p-2 mb-3 d-flex flex-column">
          <strong>£{price}</strong>
          <p className="mb-1">
            <strong>{title}</strong>
          </p>
          <p className="mb-0">{`${description.slice(0, 300)}...`}</p>
          {renderHashtags(hashtags)}
        </div>
      </Link>
    </Container>
  )
}

ProductCard.propTypes = {
  User: object,
  images: array,
  price: number,
  description: string,
  product_id: number
}

ProductCard.defaultProps = {}

export default ProductCard
