import React, { Component, Fragment } from 'react'

class TouchableMenu extends Component {
  state = { showMenu: false }

  handleItemClick = () => this.setState({ showMenu: true })

  handleCancel = () => this.setState({ showMenu: false })

  renderItem = () => {
    return <div onClick={this.handleItemClick}>{this.props.children}</div>
  }

  renderMenu = () => {
    const { id, handleEdit, handleDelete } = this.props
    return (
      <div>
        This is the menu{' '}
        <span onClick={() => handleEdit(id)} className="highlighted">
          edit
        </span>
        <span onClick={() => handleDelete(id)} className="highlighted">
          delete
        </span>
        <span onClick={this.handleCancel} className="highlighted">
          cancel
        </span>
      </div>
    )
  }
  render() {
    const { showMenu } = this.state
    return (
      <Fragment>{showMenu ? this.renderMenu() : this.renderItem()}</Fragment>
    )
  }
}

export default TouchableMenu
