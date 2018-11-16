import React, { Component, Fragment } from 'react'
import customAxios from '../../config/axios'
import { URLS } from '../../config/constants'

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
    //     element: 'p',
    //     content:
    //       'Based in Islington, London, Paul Magen designs and handcrafts unique and contemporary jewellery for men and women. With high quality and striking pieces available to order online, Paul also creates bespoke made-to-order pieces.'
    //   },
    //   {
    //     order: 2,
    //     element: 'p',
    //     content: '* * * * * *'
    //   },
    //   {
    //     order: 3,
    //     element: 'i',
    //     content:
    //       "I am happiest when dealing with customers on a one to one basis. My signature designs are a combination of organic and handmade textures which are crafted using a variety of metals from silver and gold to platinum. I also source diamonds and unusual semi precious stones which I incorporate into the designs at each customer's specification, in either a high or low set. By offering this bespoke service, my aim is to design a piece that is not solely an expression of my creativity but also an interpretation of your unique and personal style."
    //   },
    //   {
    //     order: 4,
    //     element: 'p',
    //     content: ' '
    //   },
    //   {
    //     order: 4,
    //     element: 'p',
    //     content: '* * * * * *'
    //   },
    //   {
    //     order: 5,
    //     element: 'p',
    //     content:
    //       'With striking and eye-catching collections, Paul’s designs are instantly recognisable due to the organic and unique style. His commissions are quite different though,  with one of his latest bespoke projects being to make pendants for the Secret Tea Room in Soho, using pieces from broken vintage crockery.'
    //   },
    //   {
    //     order: 6,
    //     element: 'p',
    //     content:
    //       'Paul has been commissioned to make pieces for Damon Albarn, Ruby Wax and Matt Willis, to name a few, and embraces each unique piece he gets the chance to make, using his creativity and carefully harnessed skills to make something truly special.'
    //   },
    //   {
    //     order: 7,
    //     element: 'p',
    //     content:
    //       'Providing beautiful pieces, from rings, bangles and pendants to cufflinks and earrings, Paul’s designs strike the perfect balance between traditional and contemporary, and would not be out of place in a historical museum or a contemporary boutique.'
    //   },
    //   {
    //     order: 8,
    //     element: 'p',
    //     content:
    //       'Paul started his work in jewellery when he was just 16. With experience spanning over 30 years, Paul has come to know the jewellery industry like the back of his hand, and has developed his own signature style which he finds many of his clients fall in love with. Based in Islington, London, Paul Magen designs and handcrafts unique and contemporary jewellery for men and women. Providing beautiful pieces, . From rings, bangles and pendants to cufflinks and earrings, Paul’s designs strike the perfect balance between traditional and contemporary, and would not be out of place in a historical museum or a contemporary boutique. With striking and eye-catching collections, Paul’s designs are instantly recognisable due to the organic and unique style'
    //   }
    // ]

    // await customAxios().put(`${URLS.SERVER}/users`, {
    //   story: JSON.stringify(fakeData)
    // })

    const {
      match: {
        params: { id: store_id }
      },
      store: {
        info: { id: user_id }
      },
      getStoreInfo,
      getStoreProducts
    } = this.props

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
        info: { id: store_id }
      },
      ui: { loadingLine },
      user: { id: user_id }
    } = this.props

    const isOwnStore = store_id === user_id
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

        {products.length === 0 && isOwnStore && (
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
    const hasStory = this.props.store.info.story
    const story = JSON.parse(this.props.store.info.story)

    return (
      <div className="text-center p-3">
        {hasStory ? renderMarkup(story) : 'No story added. How sad.'}
      </div>
    )
  }

  render() {
    console.log('props in store', this.props)
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
