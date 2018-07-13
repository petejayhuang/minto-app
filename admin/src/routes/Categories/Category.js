import React, { Component } from 'react'
import { getProductCategory } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Categories extends Component {
  componentDidMount() {
    this.props.getProductCategory(this.props.match.params.id)
  }

  renderCategory = () => {
    if (this.props.categories.category_id) {
      const {
        categories: { category_id, product_type, description }
      } = this.props
      return (
        <div className="row">
          <div className="col-10">
            <h3>Info Panel</h3>
            {category_id}
            {product_type}
            {description}
          </div>
          <div className="col-2">
            <h3>Power Panel</h3>
            <button className="btn btn-warning mr-3 ">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      )
    }
  }

  render() {
    return <div className="container-fluid">{this.renderCategory()}</div>
  }
}

export default connect(
  ({ categories }) => ({ categories: categories.current }),
  { getProductCategory }
)(withRouter(Categories))
