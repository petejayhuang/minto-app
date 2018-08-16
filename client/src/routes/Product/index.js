import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import Button from '../../components/Button'

import {
  getProductCategories,
  getProduct,
  createMessageThread,
  updateProduct,
  deleteProduct
} from '../../actions'

const Container = styled.div`
  .product-image-container {
    max-width: 600px;
  }
`

class Product extends Component {
  state = {
    category_id: null,
    description: null,
    editMode: false,
    errorMessage: '',
    meet_in_person: this.props.product.meet_in_person_YN,
    price: null,
    shipping: this.props.product.shipping_YN,
    buyMessage: ''
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)

    if (this.props.categories.length === 0) {
      this.props.getProductCategories()
    }
  }

  handleOption = e => {
    this.setState({ category_id: e.target.value })
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

  handleBuy = () => {
    // HIT EVENT!
    this.setState({
      buyMessage:
        "Whoops, our buy feature isn't working at the moment. Please try again later."
    })
  }

  handleDelete = () => {
    this.props.deleteProduct(this.props.product.product_id)
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
      product: { category_id, description, Prices }
    } = this.props

    // either the state was changed, or it remains the same as before
    this.props.updateProduct({
      product_id: this.props.product.product_id,
      category_id: Number(this.state.category_id) || category_id,
      description: this.state.description || description,
      price: Number(this.state.price) || Prices[0].price,
      meet_in_person_YN: this.state.meet_in_person,
      shipping_YN: this.state.shipping
    })
  }

  renderCategoryDropdown = () => (
    <select onChange={e => this.handleOption(e)}>
      {this.props.categories.map(category => (
        <option value={category.category_id} key={category.product_type}>
          {category.product_type}
        </option>
      ))}
    </select>
  )

  render() {
    const { editMode } = this.state

    if (this.props.product.product_id) {
      const {
        product: {
          User: { user_id, username },
          Images,
          Prices,
          description,
          meet_in_person_YN,
          shipping_YN
        }
      } = this.props

      const isOwnProduct = user_id === this.props.user.id
      const loggedIn = !!this.props.user.id

      return (
        <Container className="route-container d-flex flex-column align-items-center">
          <div className="product-image-container pl-3 pr-3">
            <div>
              <img
                alt="product"
                className="img-fluid"
                src={Images[0].image_URL}
              />
            </div>
            {isOwnProduct && (
              <div className="d-flex justify-content-center mb-3">
                <Button
                  secondary
                  className="mt-3 mb-3"
                  handleClick={() => this.setState({ editMode: !editMode })}
                  text={editMode ? 'cancel edits' : 'edit item'}
                />
              </div>
            )}

            {!editMode && (
              <div className="d-flex align-items-center">
                <div>
                  Sold by user:{' '}
                  <Link to={`/store/${user_id}`}>@{username}</Link>
                </div>
                {!isOwnProduct &&
                  loggedIn && (
                    <Button
                      className="mt-3 mb-3 ml-3"
                      secondary
                      handleClick={this.handleMessage}
                      text="Message seller"
                    />
                  )}
              </div>
            )}

            {editMode && (
              <div className="d-flex flex-column">
                {this.renderCategoryDropdown()}
              </div>
            )}
            <div className="d-flex flex-column">
              {editMode && <label>Product Description</label>}

              {!editMode ? (
                <p className="text-justify">{description}</p>
              ) : (
                <textarea
                  onChange={e =>
                    this.handleTextInputChange('description', e.target.value)
                  }
                  value={this.state.description || description}
                />
              )}
            </div>

            <div className="d-flex flex-column">
              {editMode && <label>Price</label>}
              {!editMode ? (
                <h3>£{`${Prices[0].price}`}</h3>
              ) : (
                <input
                  type="text"
                  onChange={e =>
                    this.handleTextInputChange('price', e.target.value)
                  }
                  value={this.state.price || Prices[0].price}
                />
              )}
            </div>
            <div className="mt-3 d-flex flex-column">
              {editMode && (
                <label htmlFor="meet_in_person">meet_in_person_YN</label>
              )}
              {!editMode ? (
                <p className="m-0">
                  Meet in person: {meet_in_person_YN ? 'Yes' : 'No'}
                </p>
              ) : (
                <input
                  name="meet_in_person"
                  id="meet_in_person"
                  type="checkbox"
                  onChange={this.handleCheckboxChange}
                  value="meet_in_person"
                  checked={this.state.meet_in_person}
                />
              )}
            </div>
            <div className="d-flex flex-column">
              {editMode && <label htmlFor="shipping">shipping_YN</label>}
              {!editMode ? (
                <p>Shipping: {shipping_YN ? 'Yes' : 'No'}</p>
              ) : (
                <input
                  type="checkbox"
                  id="shipping"
                  name="shipping"
                  value="shipping"
                  onChange={this.handleCheckboxChange}
                  checked={this.state.shipping}
                />
              )}
            </div>
            {!editMode &&
              !isOwnProduct && (
                <Button
                  className="mt-3 mb-3"
                  handleClick={this.handleBuy}
                  text="buy"
                />
              )}
            <p className="text-center">{this.state.buyMessage}</p>

            {editMode && (
              <div className="d-flex justify-content-center">
                <Button handleClick={this.handleUpdate} text="update" />
                <Button
                  secondary
                  className="ml-2"
                  handleClick={this.handleDelete}
                  text="delete"
                />
              </div>
            )}
          </div>
        </Container>
      )
    } else {
      return <div />
    }
  }
}

export default connect(
  ({ product, categories, user }) => ({ product, categories, user }),
  {
    getProduct,
    updateProduct,
    createMessageThread,
    deleteProduct,
    getProductCategories
  }
)(withRouter(Product))
