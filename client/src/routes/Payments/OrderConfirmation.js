import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextLink } from '../../components/TextLink'
import { colors } from '../../styles/styleVariables'
import styled from 'styled-components'
import CheckCircleIcon from '../../assets/icons/feather-react/CheckCircleIcon'

const Container = styled.div`
  img {
    height: 100px;
  }
`

class OrderConfirmation extends Component {
  render() {
    const { product_id } = this.props.orderConfirmed
    return (
      <Container className="route-container pl-4 pr-4 d-flex flex-column justify-content-center align-items-center">
        <CheckCircleIcon width={50} height={50} stroke={colors.primaryLight} />
        <h3 className="text-center mt-2">
          Your order of product {`${product_id} `}
          is confirmed!
        </h3>
        <p className="text-center mt-3">
          Back to <TextLink text="feed" to="/feed" />
        </p>
      </Container>
    )
  }
}

export default connect(
  ({ orderConfirmed }) => ({ orderConfirmed }),
  null
)(OrderConfirmation)
