import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  .store-photo {
    width: 175px;
    height: 175px;
  }
`

class ImageGrid extends Component {
  render() {
    const { products } = this.props
    return (
      <Container className="d-flex justify-content-center flex-wrap">
        {products.map(product => (
          <Link key={product.product_id} to={`/products/${product.product_id}`}>
            <img
              className="store-photo img-fluid m-1"
              key={product.product_id}
              src={product.images[0].image_URL}
              alt="product"
            />
          </Link>
        ))}
      </Container>
    )
  }
}

export default ImageGrid
