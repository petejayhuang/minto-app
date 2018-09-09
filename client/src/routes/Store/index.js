import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getStoreInfo, getStoreProducts, printError } from '../../actions'
import { Link } from 'react-router-dom'
import ImageGrid from '../../components/ImageGrid'
import Button from '../../components/Button'

class Store extends Component {
  state = {
    page: 1,
    limit: 6
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      store: {
        info: { user_id }
      },
      getStoreInfo,
      getStoreProducts
    } = this.props

    const store_id = id

    if (store_id !== user_id) {
      getStoreInfo(store_id)
      getStoreProducts({
        page: this.state.page,
        limit: this.state.limit,
        user_id: store_id
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id }
      },
      getStoreInfo,
      getStoreProducts
    } = this.props
    const currentStoreId = prevProps.match.params.id
    const nextStoreId = id

    if (currentStoreId !== nextStoreId) {
      getStoreInfo(nextStoreId)
      getStoreProducts({
        page: 1,
        limit: this.state.limit,
        user_id: nextStoreId
      })
      this.setState({
        page: 1,
        limit: 6
      })
    }
  }

  loadMoreProducts = () => {
    const { page, limit } = this.state
    const {
      store: {
        info: { total_products },
        products
      },
      match: {
        params: { id }
      },
      printError,
      getStoreProducts
    } = this.props

    if (!total_products === products.length) {
      getStoreProducts({
        page: page + 1,
        limit,
        user_id: id
      })

      this.setState({ page: page + 1 })
    } else {
      printError({ message: 'All products loaded!', error: {} })
    }
  }

  render() {
    const {
      store: {
        products,
        info: { profile_URL, username, user_id }
      },
      ui: { loadingLine },
      user: { id }
    } = this.props

    const isOwnStore = id === user_id
    return (
      <div className="route-container inner-container">
        <div className="d-flex p-3 border-bottom-light">
          <div className="profile-image-container">
            <img alt="profile" className="profile-image" src={profile_URL} />
          </div>

          <div className="ml-2 d-flex flex-column justify-content-center">
            <div>
              <h3>@{username}</h3>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h4 className="mt-3 mb-3">SELLING ({products.length})</h4>
        </div>
        <ImageGrid products={products} />

        {products.length > 3 && (
          <div className="mt-3 d-flex justify-content-center">
            <Button
              loading={loadingLine}
              handleClick={this.loadMoreProducts}
              className="mb-3"
              text="Load more images"
            />
          </div>
        )}

        {products.length === 0 &&
          isOwnStore && (
            <div>
              <p className="text-center">
                You haven't listed anything to sell! Start{' '}
                <Link className="" to="/add">
                  here
                </Link>
              </p>
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = ({ store, ui, user }) => ({
  store,
  ui,
  user
})

Store.defaultProps = {}
Store.propTypes = {}

export default connect(
  mapStateToProps,
  { getStoreInfo, getStoreProducts, printError }
)(Store)
