import React, { Component } from "react"
import { connect } from "react-redux"

import { getStoreInfo, getStoreProducts } from "../../actions"
import SecondaryButton from "../../components/SecondaryButton"
import ImageGrid from "../../components/ImageGrid"

class Store extends Component {
  state = {
    page: 1,
    limit: 6
  }

  componentDidMount() {
    const {
      match,
      store: { info, products },
      getStoreProducts
    } = this.props

    const store_id = match.params.id

    if (!info.user_id) {
      this.props.getStoreInfo(store_id)
    }

    if (products.length === 0) {
      getStoreProducts({
        page: this.state.page,
        limit: this.state.limit,
        user_id: store_id
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
    return (
      <div className="route-container inner-container">
        <div className="d-flex p-3">
          <div className="profile-image-container">
            <img
              alt="profile"
              className="profile-image"
              src={`${this.props.store.info.profile_URL}`}
            />
          </div>

          <div className="ml-2">
            <div>
              <h3>{this.props.store.info.username}</h3>
            </div>
            <SecondaryButton text="Follow" />
          </div>
        </div>

        <div className="mt-2 pl-3 pr-3 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <strong>{this.props.store.info.total_products}</strong>
            <p className="m-0">items</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <strong>{this.props.store.info.total_followers}</strong>
            <p className="m-0">followers</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <strong>{this.props.store.info.total_following}</strong>
            <p className="m-0">following</p>
          </div>
        </div>

        <ImageGrid products={this.props.store.products} />
        <button onClick={this.loadMoreProducts}> get more images</button>
      </div>
    )
  }
}

const mapStateToProps = ({ store, ui }) => ({
  store,
  ui
})

Store.defaultProps = {}
Store.propTypes = {}

export default connect(
  mapStateToProps,
  { getStoreInfo, getStoreProducts }
)(Store)
