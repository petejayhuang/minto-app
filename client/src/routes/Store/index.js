import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getStoreInfo, getStoreProducts } from '../../actions'
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
      match,
      store: { info },
      getStoreProducts
    } = this.props

    const store_id = match.params.id

    if (store_id !== info.user_id) {
      this.props.getStoreInfo(store_id)
      getStoreProducts({
        page: this.state.page,
        limit: this.state.limit,
        user_id: store_id
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { match, getStoreProducts } = this.props
    const currentStoreId = prevProps.match.params.id
    const nextStoreId = match.params.id

    if (currentStoreId != nextStoreId) {
      this.props.getStoreInfo(nextStoreId)
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

    this.props.getStoreProducts({
      page: page + 1,
      limit,
      user_id: this.props.match.params.id
    })

    this.setState({ page: page + 1 })
  }

  render() {
    const isOwnStore = this.props.user.id === this.props.store.info.user_id
    return (
      <div className="route-container inner-container">
        <div className="d-flex p-3 border-bottom-light">
          <div className="profile-image-container">
            <img
              alt="profile"
              className="profile-image"
              src={`${this.props.store.info.profile_URL}`}
            />
          </div>

          <div className="ml-2 d-flex flex-column justify-content-center">
            <div>
              <h3>@{this.props.store.info.username}</h3>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h4 className="mt-3 mb-3">SELLING</h4>
        </div>
        <ImageGrid products={this.props.store.products} />

        {this.props.store.products.length > 3 && (
          <div className="mt-3 d-flex justify-content-center">
            <Button
              loading={this.props.ui.loadingLine}
              handleClick={this.loadMoreProducts}
              className="mb-3"
              text="load more images"
            />
          </div>
        )}

        {this.props.store.products.length === 0 &&
          isOwnStore && (
            <div>
              <p className="text-center">
                You haven't listed anything to sell! Start{' '}
                <Link className="highlighted-link" to="/add">
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
  { getStoreInfo, getStoreProducts }
)(Store)
