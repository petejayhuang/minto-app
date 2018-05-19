import React, { Component } from "react"
import PropTypes from "prop-types"

class ProductDetails extends Component {
  state = {
    title: "",
    description: "",
    price: ""
  }

  handleInputChange = (inputName, event) => {
    this.setState({ [inputName]: event.target.value })
  }

  render() {
    return (
      <div className="flex-column">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={e => this.handleInputChange("title", e)}
          />
        </div>

        <div className="flex-column">
          <label>Description</label>
          <textarea
            value={this.state.description}
            onChange={e => this.handleInputChange("description", e)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            value={this.state.price}
            onChange={e => this.handleInputChange("price", e)}
          />
        </div>
      </div>
    )
  }
}

ProductDetails.defaultProps = {}
ProductDetails.propTypes = {}

export default ProductDetails
