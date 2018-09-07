import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/styleVariables'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 600px;
  border: 1px solid ${colors.border};
  border-radius: 3px;
  margin-bottom: 20px;
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
  const { User, Images, Prices, description, product_id } = props
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
      <Link to={`/products/${product_id}`}>
        <img
          className="product-image img-fluid"
          key={product_id}
          alt="product"
          src={Images[0].image_URL}
        />
      </Link>
      <Link to={`/products/${product_id}`}>
        <div className="p-2 mb-3 d-flex flex-column">
          <strong>£{Prices[0].price}</strong>
          {`${description.slice(0, 500)}`}
        </div>
      </Link>
    </Container>
  )
}

ProductCard.propTypes = {}

ProductCard.defaultProps = {}

export default ProductCard
