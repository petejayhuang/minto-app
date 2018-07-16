import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LikeButton from '../../components/LikeButton'

import {
  getProductCategories,
  getProduct,
  createMessageThread,
  updateProduct,
  deleteProduct,
  createOrder
} from '../../actions'

const Container = styled.div``

class Product extends Component {
  state = {
    category_id: null,
    description: null,
    editMode: false,
    errorMessage: '',
    meet_in_person: this.props.product.meet_in_person_YN,
    price: null,
    shipping: this.props.product.shipping_YN
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

  handleBuy = async () => {
    // check if they are a customer, if not, create using user details
    // await this.props.createCustomer({
    //   first_name: first_name || this.props.user.first_name,
    //   last_name: last_name || this.props.user.last_name,
    //   email: email || this.props.user.email
    // })
    // await this.props.addCardToCustomer()
    // this.props.createTransaction()
    // // check if they have a card
    // const { product_id } = this.props.product
    // this.props.createOrder({
    //   product_id
    // })
    //
  }

  handleDelete = () => {
    this.props.deleteProduct(this.props.product.product_id)
  }

  handleMessage = () => {
    const { User, product_id } = this.props.product

    this.props.createMessageThread({
      username: [User.username],
      participant_id: [User.user_id],
      product_id: product_id
    })
  }

  handleUpdate = () => {
    const {
      product: {
        category_id,
        description,
        Prices,
        meet_in_person_YN,
        shipping_YN
      }
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

    if (this.props.product.Images) {
      const {
        categories,
        product: {
          User: { user_id, username },
          Images,
          Prices,
          description,
          meet_in_person_YN,
          shipping_YN,
          product_id,
          category_id
        }
      } = this.props

      const isOwnProduct = user_id === this.props.user.id
      // console.log('<Product />', this.state)
      console.log('<Product /> meet in person', this.state.meet_in_person)
      console.log('<Product /> shipping', this.state.shipping)
      return (
        <Container className="route-container p-3">
          {isOwnProduct && (
            <div className="d-flex">
              <button onClick={() => this.setState({ editMode: !editMode })}>
                {editMode ? 'cancel edits' : 'toggle edit'}
              </button>
            </div>
          )}

          <div className="d-flex">
            {<img className="img-fluid" src={Images[0].image_URL} />}
          </div>

          {!editMode && <div>{product_id}</div>}
          {!editMode && <div>{username}</div>}
          {!editMode &&
            !isOwnProduct && (
              <button onClick={this.handleMessage}>Message seller</button>
            )}
          {!editMode && <LikeButton />}

          {!editMode &&
            categories.length > 0 && (
              <div>
                {
                  categories.filter(
                    category => category.category_id === category_id
                  )[0].product_type
                }
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
              <div>description: {description}</div>
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
              <div>price: {`${Prices[0].price}`}</div>
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
          <div className="d-flex flex-column">
            {editMode && (
              <label htmlFor="meet_in_person">meet_in_person_YN</label>
            )}
            {!editMode ? (
              <div>meet_in_person_YN: {meet_in_person_YN ? 'yes' : 'no'}</div>
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
              <div>shipping_YN: {shipping_YN ? 'yes' : 'no'}</div>
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
            !isOwnProduct && <button onClick={this.handleBuy}>buy</button>}
          {editMode && <button onClick={this.handleUpdate}>update</button>}
          {editMode && <button onClick={this.handleDelete}>delete</button>}
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
    getProductCategories,
    createOrder
  }
)(Product)
