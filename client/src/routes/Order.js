import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOrder } from '../actions'

class Order extends Component {
  state = {
    page: 1,
    limit: 6
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.id)
  }

  render() {
    const {
      created_at,
      id,
      order_date,
      order_status_id,
      product_id,
      updated_at
    } = this.props.orders.order
    return (
      <div className="route-container pl-3 pr-3">
        <li>created_at: {created_at}</li>
        <li>id: {id}</li>
        <li>order_date: {order_date}</li>
        <li>order_status_id: {order_status_id}</li>
        <li>product_id: {product_id}</li>
        <li>updated_at: {updated_at}</li>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => ({ orders })

Order.defaultProps = {}
Order.propTypes = {}

export default connect(
  mapStateToProps,
  { getOrder }
)(Order)
