import React, { Component } from 'react'
import { getOrders } from '../../actions'
import { connect } from 'react-redux'
import { generateTableHeader } from '../../utilities/renderTable'

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders()
  }
  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                {this.props.orders.length > 0 &&
                  generateTableHeader({ values: this.props.orders })}
                <tbody>
                  {this.props.orders.map(order => {
                    return (
                      <tr>
                        <td>{order.order_id}</td>
                        <td>{order.order_date}</td>
                        <td>{order.User.user_id}</td>
                        <td>{order.Product.product_id}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ orders }) => ({ orders: orders.list }),
  { getOrders }
)(Orders)
