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
            <div
              className="store-photo m-1"
              key={product.product_id}
              style={{
                backgroundImage: `url(${product.Images[0].image_URL})`,
                backgroundPosition: 'cover'
              }}
            />
          </Link>
        ))}
      </Container>
    )
  }
}

export default ImageGrid
