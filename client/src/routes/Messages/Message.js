import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessageThread, createMessage } from '../../actions/'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'

const Container = styled.div`
  .chat-input {
    position: absolute;
    bottom: 60px;
    width: 100vw;
  }
`

class Message extends Component {
  state = {
    message: ''
  }
  componentDidMount() {
    this.props.getMessageThread(this.props.match.params.id)
  }
  handleInputChange = e => {
    this.setState({ message: e.target.value })
  }
  handleSend = () => {
    this.props.createMessage({
      thread_id: this.props.match.params.id,
      body: this.state.message
    })
    this.setState({ message: '' })
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleSend()
    }
  }

  renderMessages = () => {
    return this.props.messages.currentThread.map(message => (
      <p
        key={message.id}
        className={
          message.sender_user_id === this.props.user.id
            ? 'text-right'
            : 'text-left'
        }
      >
        {message.body}
      </p>
    ))
  }

  render() {
    return (
      <Container className="route-container pr-3">
        {this.renderMessages()}
        <div className="chat-input border-top pt-3 d-flex justify-content-center">
          <input
            onKeyDown={this.handleKeyDown}
            type="text"
            onChange={this.handleInputChange}
            value={this.state.message}
          />
          <Button className="ml-2" handleClick={this.handleSend} text="send" />
        </div>
      </Container>
    )
  }
}

const mapState = ({ user, messages }) => ({ user, messages })

export default connect(
  mapState,
  { getMessageThread, createMessage }
)(withRouter(Message))
