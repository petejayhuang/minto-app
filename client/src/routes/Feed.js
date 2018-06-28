import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeed } from '../actions'
import ProductCard from '../components/ProductCard'

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
      <div className="route-container">
        {this.props.feed.map(product => (
          <ProductCard key={product.product_id} {...product} />
        ))}
        <button onClick={this.loadMoreProducts}> get more images</button>
      </div>
    )
  }
}

Feed.defaultProps = {}
Feed.propTypes = {}

const mapState = ({ feed }) => ({ feed })

export default connect(
  mapState,
  { getFeed }
)(Feed)
