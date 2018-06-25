import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import LikeButton from "../../components/LikeButton"
import {
  getProductCategories,
  getProduct,
  updateProduct,
  deleteProduct,
  createOrder
} from "../../actions"

const Container = styled.div``

class Product extends Component {
  state = {
    category_id: null,
    description: null,
    editMode: false,
    errorMessage: "",
    meet_in_person: this.props.product.meet_in_person_YN,
    price: null,
    shipping: this.props.product.shipping_YN
  }

  componentDidMount() {
    this.props.getProduct(this.props.location.pathname.split("/")[2])

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

  handleCheckboxChange = (checkboxName, e) => {
    this.setState({
      [checkboxName]: !this.state[checkboxName]
    })
  }

  handleBuy = () => {
    const { product_id } = this.props.product
    this.props.createOrder({
      product_id
    })
  }

  handleDelete = () => {
    this.props.deleteProduct(this.props.product.product_id)
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
      meet_in_person_YN: this.state.meet_in_person || meet_in_person_YN,
      shipping_YN: this.state.shipping || shipping_YN
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
    const {
      User,
      Images,
      Prices,
      description,
      meet_in_person_YN,
      shipping_YN,
      product_id
    } = this.props.product

    const { editMode } = this.state
    if (this.props.product.Images) {
      return (
        <Container className="route-container">
          <div className="d-flex">
            <button onClick={() => this.setState({ editMode: !editMode })}>
              {editMode ? "cancel edits" : "toggle edit"}
            </button>
          </div>
          <div className="d-flex">{<img src={Images[0].image_URL} />}</div>
          {!editMode && <div>{product_id}</div>}
          {!editMode && <div>{User.username}</div>}
          {!editMode && <LikeButton />}

          <div className="d-flex flex-column">
            {this.renderCategoryDropdown()}
          </div>
          <div className="d-flex flex-column">
            {editMode && <label>Product Description</label>}
            {!editMode ? (
              <div>description: {description}</div>
            ) : (
              <textarea
                onChange={e =>
                  this.handleTextInputChange("description", e.target.value)
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
                  this.handleTextInputChange("price", e.target.value)
                }
                value={this.state.price || Prices[0].price}
              />
            )}
          </div>

          <div className="d-flex flex-column">
            {editMode && <label>meet_in_person_YN</label>}
            {!editMode ? (
              <div>meet_in_person_YN: {meet_in_person_YN ? "yes" : "no"}</div>
            ) : (
              <input
                onChange={e => this.handleCheckboxChange("meet_in_person", e)}
                id="meet_in_person"
                value="meet-in-person"
                checked={this.state.meet_in_person || meet_in_person_YN}
                type="checkbox"
              />
            )}
          </div>

          <div className="d-flex flex-column">
            {editMode && <label>shipping_YN</label>}
            {!editMode ? (
              <div>shipping_YN: {shipping_YN ? "yes" : "no"}</div>
            ) : (
              <input
                onChange={e => this.handleCheckboxChange("shipping", e)}
                id="shipping"
                value="shipping"
                checked={this.state.shipping || shipping_YN}
                type="checkbox"
              />
            )}
          </div>
          {/* MISSING!  */}
          {/* <div>category_id: {category_id}</div> */}
          {!editMode && <button onClick={this.handleBuy}>buy</button>}
          {editMode && <button onClick={this.handleUpdate}>update</button>}
          {editMode && <button onClick={this.handleDelete}>delete</button>}
        </Container>
      )
    } else {
      return <div />
    }
  }
}

Product.defaultProps = {}
Product.propTypes = {}

export default connect(
  ({ product, categories }) => ({ product, categories }),
  {
    getProduct,
    updateProduct,
    deleteProduct,
    getProductCategories,
    createOrder
  }
)(Product)
