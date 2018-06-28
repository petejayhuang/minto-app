import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  .store-photo {
    width: 33%;
    height: 33%;
  }
`

class ImageGrid extends Component {
  render() {
    return (
      <Container>
        {this.props.products.map(product => (
          <Link key={product.product_id} to={`/products/${product.product_id}`}>
            <img
              className="store-photo"
              key={product.product_id}
              src={product.Images[0].image_URL}
            />
          </Link>
        ))}
      </Container>
    )
  }
}

export default ImageGrid
