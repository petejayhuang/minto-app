import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/styleVariables'
import { Link } from 'react-router-dom'

const Container = styled.div`
  border: 1px solid ${colors.border};
  margin-bottom: 40px;
  background-color: white;
  .profile-image {
    height: 50px;
    width: 50px;
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
        <Link
          className="d-flex align-items-center"
          to={`/store/${User.user_id}`}
        >
          <img className="ml-1 profile-image" src={User.profile_URL} />
          <div className="ml-3">
            <strong>{User.username}</strong>
          </div>
        </Link>
      </div>
      <Link to={`/products/${product_id}`}>
        <div
          className="product-image"
          key={product_id}
          style={{
            backgroundImage: `url(${Images[0].image_URL})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
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
