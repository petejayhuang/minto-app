import React, { Component } from 'react'
import styled from 'styled-components'

import ChevronRightIcon from '../../assets/icons/feather-react/ChevronRightIcon'
import { colors } from '../../styles/styleVariables'

const Container = styled.div`
  background: white;
  border-top: 1px solid ${colors.border};
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${colors.border}` : 'none'};
  &:hover {
    cursor: pointer;
  }
`
const InternalLink = props => {
  const { borderBottom, className, text, handleClick } = props
  return (
    <Container
      borderBottom={borderBottom}
      className={[
        'd-flex justify-content-between align-items-center pl-3 p-1',
        className
      ]}
      onClick={handleClick}
    >
      <div className="m-0 p-0">{text}</div>
      <div>
        <ChevronRightIcon />
      </div>
    </Container>
  )
}

class Menu extends Component {
  state = { showMenu: false }

  handleItemClick = () => this.setState({ showMenu: true })

  handleCancel = () => {
    console.log('handleCancel')
    this.setState({ showMenu: false })
  }

  renderItem = () => (
    <div onClick={this.handleItemClick}>{this.props.children}</div>
  )

  renderMenu = () => {
    const { id, handleEdit, handleDelete } = this.props
    return (
      <div className="d-flex pl-3 justify-content-between">
        <span onClick={() => handleEdit(id)} className="highlighted">
          edit
        </span>
        <span className="ml-2 highlighted" onClick={() => handleDelete(id)}>
          delete
        </span>
        <span className="ml-2 highlighted" onClick={this.handleCancel}>
          cancel
        </span>
      </div>
    )
  }
  render() {
    console.log('menu re-render')
    const { showMenu } = this.state
    return (
      <Container
        onClick={this.handleItemClick}
        className="d-flex justify-content-between align-items-center pl-3 p-1"
      >
        {showMenu ? this.renderMenu() : this.renderItem()}
      </Container>
    )
  }
}

const TouchableRow = { InternalLink, Menu }
export { TouchableRow }
