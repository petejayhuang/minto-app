import React, { Component } from 'react'
import { getProductCategories } from '../../actions'
import { connect } from 'react-redux'
import { renderTable } from '../../utilities/renderTable'

class Categories extends Component {
  componentDidMount() {
    this.props.getProductCategories()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {renderTable({
              values: this.props.categories,
              match: this.props.match
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ categories }) => ({ categories: categories.list }),
  { getProductCategories }
)(Categories)
