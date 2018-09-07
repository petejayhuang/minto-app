import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeed } from '../../actions'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #f5f5f5;
`

class Feed extends Component {
  state = {
    page: 1,
    limit: 6
  }

  componentDidMount() {
    this.props.getFeed({ page: 1, limit: 3 })
  }

  loadMoreProducts = () => {
    const { page, limit } = this.state

    this.props.getFeed({
      page: page + 1,
      limit
    })
    this.setState({ page: page + 1 })
  }

  render() {
    return (
      <Container className="route-container d-flex flex-column align-items-center">
        {this.props.feed.map(product => (
          <ProductCard key={product.product_id} {...product} />
        ))}
        <Button
          loading={this.props.ui.loadingLine}
          handleClick={this.loadMoreProducts}
          className="mb-3"
          text="More items"
        />
      </Container>
    )
  }
}

Feed.defaultProps = {}
Feed.propTypes = {}

const mapState = ({ feed, ui }) => ({ feed, ui })

export default connect(
  mapState,
  { getFeed }
)(Feed)
