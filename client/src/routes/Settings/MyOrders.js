import React, { Component } from "react"
import { connect } from "react-redux"
import { getOrders } from "../../actions"
import { Link } from "react-router-dom"

class MyOrders extends Component {
  componentDidMount() {
    this.props.getOrders()
  }
  render() {
    return (
      <div className="route-container pl-3 pr-3">
        {this.props.orders.orders.map(order => {
          return (
            <Link to={`/orders/${order.id}`}>
              <li>
                order: {order.id}, product: {order.product_id}, created:{" "}
                {order.created_at}, status: {order.order_status_id}
              </li>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapState = ({ orders }) => ({ orders })

export default connect(
  mapState,
  { getOrders }
)(MyOrders)
