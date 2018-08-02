import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getStoreInfo,
  getStoreProducts,
  createMessageThread
} from '../../actions'
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
    }

    if (store_id !== info.user_id) {
      getStoreProducts({
        page: this.state.page,
        limit: this.state.limit,
        user_id: store_id
      })
    }
  }

  handleMessage = () => {
    const { username, user_id } = this.props.store.info
    this.props.createMessageThread({
      username,
      participant_id: user_id
    })
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
        <div className="d-flex p-3 border-bottom-light">
          <div className="profile-image-container">
            <img
              alt="profile"
              className="profile-image"
              src={`${this.props.store.info.profile_URL}`}
            />
          </div>

          <div className="ml-2">
            <div>
              <h3>@{this.props.store.info.username}</h3>
            </div>
            <Button handleClick={this.handleMessage} text="message seller" />
          </div>
        </div>

        <div className="text-center">
          <h4 className="mt-3 mb-3">SELLING</h4>
        </div>
        <ImageGrid products={this.props.store.products} />
        <div className="mt-3 d-flex justify-content-center">
          <Button
            handleClick={this.loadMoreProducts}
            className="mb-3"
            text="get more images"
          />
        </div>
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
  { getStoreInfo, getStoreProducts, createMessageThread }
)(Store)
