import { compose } from 'redux'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { printError } from '../../actions/error'

import Button from '../../components/Button'
import CheckoutForm from '../../components/CheckoutForm'
import Dropdown from '../../components/Dropdown'
import LikeButton from './LikeButton'
import ImageCarousel from '../../components/ImageCarousel'
import { TextLink } from '../../components/TextLink'
import { renderHashtags } from '../../utilities/renderHashtags'
import XCircleIcon from '../../assets/icons/feather-react/XCircleIcon'
import { colors } from '../../styles/styleVariables'

import {
  getProductCategories,
  getProduct,
  createMessageThread,
  updateProduct,
  deleteProduct,
  redirect,
  getStripeTokenRequest,
  getStripeTokenSuccess,
  getStripeTokenFailure,
  buyProduct
} from '../../actions'

const Container = styled.div`
  .product-container {
    height: auto;
    width: 100%;
    max-width: 600px;
  }
`

class Product extends Component {
  state = {
    category_id: null,
    description: null,
    editMode: false,
    currentHashtag: '',
    hashtags: null,
    errorMessage: '',
    price: null,
    showPaymentForm: false,
    showLikeButton: true,
    title: ''
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
    if (this.props.categories.length === 0) {
      this.props.getProductCategories()
    }
  }

  handleOption = value => {
    this.setState({ category_id: value })
  }

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleCheckboxChange = event => {
    const checkboxName = event.target.name
    this.setState({
      [checkboxName]: !this.state[checkboxName]
    })
  }

  handleBuy = async () => {
    const { dispatch, stripe, buyProduct } = this.props
    dispatch(getStripeTokenRequest)
    try {
      const { token } = await stripe.createToken()
      dispatch(getStripeTokenSuccess)

      await buyProduct({
        stripeToken: token.id,
        product_id: this.props.productId
      })

      redirect('/order-confirmation')
    } catch (e) {
      dispatch(getStripeTokenFailure(e))
    }
  }

  handleDelete = () => {
    this.props.deleteProduct(this.props.product.id)
  }

  handleMessage = () => {
    const { User, product_id } = this.props.product

    this.props.createMessageThread({
      username: [User.username],
      participant_id: [User.user_id],
      product_id: product_id || ''
    })
  }

  handleUpdate = () => {
    const {
      product: { category_id, description, price, title, hashtags }
    } = this.props

    // either the state was changed, or it remains the same as before
    this.props.updateProduct({
      product_id: this.props.product.id,
      category_id: Number(this.state.category_id) || category_id,
      description: this.state.description || description,
      price: Number(this.state.price) || price,
      title: Number(this.state.title) || title,
      hashtags: this.state.hashtags || hashtags
    })
  }

  handleRemoveHashtag = (hashtags, value) => {
    const newHashtags = hashtags.filter(hashtag => hashtag !== value)
    this.setState({ hashtags: newHashtags })
  }

  handleAddHashtag = hashtags => {
    const { currentHashtag } = this.state
    if (hashtags.length < 5 && currentHashtag.length > 0) {
      this.setState({
        hashtags: hashtags.concat(currentHashtag),
        currentHashtag: ''
      })
    } else {
      if (currentHashtag.length > 0)
        this.props.printError({ message: 'You can only add 5 hashtags' })
    }
  }

  renderHashtags = hashtags => {
    if (hashtags.length > 0) {
      return (
        <ul className="hashtag-list d-flex flex-wrap mb-2 m-0 p-0">
          {hashtags.map(hashtag => (
            <li
              onClick={() =>
                this.handleRemoveHashtag(
                  this.state.hashtags || hashtags,
                  hashtag
                )
              }
              className="hover-hand pt-1 pr-2 pb-1 pl-2 hashtag mb-2 mr-2 d-flex justify-content-between"
            >
              <span className="pr-2">{hashtag}</span>

              <XCircleIcon stroke={colors.primaryLight} />
            </li>
          ))}
        </ul>
      )
    }
  }

  renderEditMode = () => {
    const {
      product: { price, description, title, hashtags },
      categories
    } = this.props

    return (
      <div className="product-container p-3 d-flex flex-column align-items-center">
        <label>Product Category</label>

        <Dropdown dropdownItems={categories} handleSelect={this.handleOption} />

        <label className="mt-3">Title</label>
        <input
          type="text"
          onChange={e => this.handleTextInputChange('title', e.target.value)}
          value={this.state.title || title}
        />

        <label className="mt-3">Product Description</label>
        <textarea
          onChange={e =>
            this.handleTextInputChange('description', e.target.value)
          }
          value={this.state.description || description}
        />

        <div className="d-flex flex-column">
          <label className="mt-3">
            <strong>Hashtags</strong>
          </label>
          {this.renderHashtags(this.state.hashtags || hashtags)}
          <input
            type="text"
            onChange={e =>
              this.handleTextInputChange('currentHashtag', e.target.value)
            }
            value={this.state.currentHashtag}
          />
          <Button
            className="mt-2"
            secondary
            onClick={() =>
              this.handleAddHashtag(this.state.hashtags || hashtags)
            }
            text="Add hashtag"
          />
        </div>

        <label className="mt-3">Price</label>
        <input
          type="text"
          onChange={e => this.handleTextInputChange('price', e.target.value)}
          value={this.state.price || price}
        />

        <div className="d-flex justify-content-center mt-5">
          <Button handleClick={this.handleUpdate} text="Update" />
          <Button
            secondary
            className="ml-2"
            handleClick={this.handleDelete}
            text="Delete"
          />
        </div>
      </div>
    )
  }

  showPaymentForm = () => {
    this.setState({ showPaymentForm: true })
  }

  hideLikeButton = () => this.setState({ showLikeButton: false })

  renderViewMode = () => {
    const {
      product: {
        id: product_id,
        User: { id: product_user_id, username },
        price,
        description,
        hashtags,
        Like,
        title
      },
      user: { id: user_id }
    } = this.props
    const { showPaymentForm, showLikeButton } = this.state
    const isOwnProduct = product_user_id === this.props.user.id
    const like_id = Like && Like.id

    return (
      <div className="product-container d-flex flex-column pl-3 pr-3">
        <div className="d-flex justify-content-between">
          {title && <h4 className="m-0">{title}</h4>}

          {!isOwnProduct && showLikeButton && (
            <LikeButton
              callback={this.hideLikeButton}
              user_id={user_id}
              like_id={like_id}
              product_id={product_id}
            />
          )}
        </div>

        <div className="mt-2">
          Sold by{' '}
          <TextLink to={`/store/${product_user_id}`} text={`@${username}`} />
        </div>

        <div>
          {!isOwnProduct && (
            <Button
              className="mt-1"
              secondary
              handleClick={this.handleMessage}
              text="Message seller"
            />
          )}
        </div>

        <p className="text-justify mt-3 mb-0">{description}</p>
        {renderHashtags(hashtags)}

        <h3 className="mt-3">£{`${price}`}</h3>

        {!isOwnProduct && !showPaymentForm && (
          <Button
            className="mt-1 mb-3"
            handleClick={this.showPaymentForm}
            text="Buy"
          />
        )}

        {showPaymentForm && (
          <Elements>
            <CheckoutForm productId={product_id} />
          </Elements>
        )}
      </div>
    )
  }

  renderProduct = () => {
    if (this.props.product.id) {
      const { editMode } = this.state
      const {
        user,
        product: { User: productOwner, images }
      } = this.props
      const isOwnProduct = user.id === productOwner.id

      return (
        <Fragment>
          <div className="product-container mb-2">
            <ImageCarousel images={images} />
          </div>
          {isOwnProduct && this.renderEditButton()}

          {editMode ? this.renderEditMode() : this.renderViewMode()}
        </Fragment>
      )
    } else {
      return <div />
    }
  }

  renderEditButton = () => {
    const { editMode } = this.state
    return (
      <div className="d-flex justify-content-center">
        <Button
          secondary
          className="mt-3 mb-3"
          handleClick={() => this.setState({ editMode: !editMode })}
          text={editMode ? 'Cancel edits' : 'Edit item'}
        />
      </div>
    )
  }

  render() {
    console.log('<Product />')
    return (
      <Container className="route-container d-flex flex-column align-items-center">
        <div>{this.renderProduct()}</div>
      </Container>
    )
  }
}

export default compose(
  connect(
    ({ product, categories, user }) => ({ product, categories, user }),
    {
      getProduct,
      printError,
      updateProduct,
      createMessageThread,
      deleteProduct,
      getProductCategories,
      redirect,
      getStripeTokenRequest,
      getStripeTokenSuccess,
      getStripeTokenFailure,
      buyProduct
    }
  ),
  withRouter
)(Product)
