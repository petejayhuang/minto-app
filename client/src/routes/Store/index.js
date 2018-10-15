import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { colors } from '../../styles/styleVariables'
import styled from 'styled-components'

import { getStoreInfo, getStoreProducts, printError } from '../../actions'
import renderMarkup from '../../utilities/renderMarkup'
import { Link } from 'react-router-dom'
import ImageGrid from '../../components/ImageGrid'
import Button from '../../components/Button'

const Container = styled.div`
  .active-tab {
    background-color: ${colors.primary};
    color: white;
  }
`

class Store extends Component {
  state = {
    page: 1,
    limit: 6,
    currentTab: 'items'
  }

  async componentDidMount() {
    // const fakeData = [
    //   {
    //     order: 1,
    //     element: 'h1',
    //     content: 'AAA  ASDYGAISUD asldhaiosd YGIAUDYG'
    //   },
    //   {
    //     order: 2,
    //     element: 'p',
    //     content:
    //       'AAA Lorem as9d8yas9d8lijaoisdasdinting and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...'
    //   },
    //   {
    //     order: 3,
    //     element: 'h1',
    //     content: 'AAA  Paul wanted thisaodsijaoisd bit in'
    //   },
    //   {
    //     order: 4,
    //     element: 'h4',
    //     content: 'AAA  this asdpojapsodis alist'
    //   }
    // ]

    // await customAxios().put(`${URLS.SERVER}/users`, {
    //   story: JSON.stringify(fakeData)
    // })

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

  renderItemsTab = () => {
    const {
      store: {
        products,
        info: { user_id }
      },
      ui: { loadingLine },
      user: { id }
    } = this.props

    const isOwnStore = id === user_id
    return (
      <Fragment>
        <div className="mt-2">
          <ImageGrid products={products} />
        </div>

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
            <p className="text-center mt-3">
              You haven't listed anything to sell! Start{' '}
              <Link className="highlighted" to="/add">
                here
              </Link>
            </p>
          )}
      </Fragment>
    )
  }

  switchTab = currentTab => this.setState({ currentTab })

  renderStoryTab = () => {
    const fakeData = [
      { order: 1, element: 'h1', content: 'What is Lorem Ipsum?' },
      {
        order: 2,
        element: 'p',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...'
      }
    ]

    const hasStory = this.props.store.info.story
    const story = JSON.parse(this.props.store.info.story)

    return (
      <div className="text-center p-3">
        {hasStory
          ? renderMarkup(story || fakeData)
          : 'No story added. How sad.'}
      </div>
    )
  }

  render() {
    const {
      store: {
        products,
        info: { profile_URL, username }
      }
    } = this.props

    const { currentTab } = this.state
    const itemsTabActive = currentTab === 'items'
    const storyTabActive = currentTab === 'story'

    return (
      <Container className="route-container inner-container">
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

        <div className="text-center d-flex justify-content-center border-bottom-light">
          <div
            className={`${storyTabActive && 'active-tab'} hover-hand`}
            onClick={() => this.switchTab('story')}
          >
            <h4 className="m-3">MY STORY</h4>
          </div>

          <div
            className={`${itemsTabActive && 'active-tab'} hover-hand`}
            onClick={() => this.switchTab('items')}
          >
            <h4 className="m-3">SELLING ({products.length})</h4>
          </div>
        </div>

        {currentTab === 'items' && this.renderItemsTab()}
        {currentTab === 'story' && this.renderStoryTab()}
      </Container>
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
