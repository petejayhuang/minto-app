import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ProductCard from "../components/ProductCard"
import styled from "styled-components"
import LikeButton from "../components/LikeButton"
import { getProduct } from "../actions/product"

const Container = styled.div``

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(1391)
  }
  handleBuy = () => console.log("buy buy buy!")

  render() {
    const {
      User,
      Media,
      Prices,
      description,
      meet_in_person_YN,
      shipping_YN
    } = this.props.product

    const { pathname } = this.props.location

    if (this.props.product.Media) {
      return (
        <Container className="route-container">
          <img src={Media[0].image_URL} />
          {/* MISSING PROFILE PIC! */}
          {/* <img className="profile-image" src="" /> */}
          <div>{User.username}</div>
          <LikeButton />
          <div>description: {description}</div>
          <div>price: {`${Prices[0].price}`}</div>
          <div>meet_in_person_YN: {meet_in_person_YN ? "yes" : "no"}</div>
          <div>shipping_YN: {shipping_YN ? "yes" : "no"}</div>
          {/* MISSING!  */}
          {/* <div>category_id: {category_id}</div> */}
          <button onClick={this.handleBuy}>buy</button>
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
  ({ product }) => ({ product }),
  { getProduct }
)(Product)
