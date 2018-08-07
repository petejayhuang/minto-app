import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessageThread, createMessage } from '../../actions/'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'
import { colors } from '../../styles/styleVariables'

const Container = styled.div`
  .chat-input {
    position: absolute;
    bottom: 60px;
    width: 100vw;
  }
  .chat-bubble {
    display: inline;
    padding: 5px 10px 5px 10px;
    border-radius: 20px;
    &.user-bubble {
      text-align: right
      background-color: ${colors.primaryLight};
      color: white;
    }
    &.recipient-bubble {
      background-color: ${colors.background};
      color: ${colors.text};
    }
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

  renderMessages = () =>
    this.props.messages.currentThread.map(message => {
      const userMessage = message.sender_user_id === this.props.user.id
      return (
        <div
          key={message.id}
          className={`d-flex ${
            userMessage ? 'justify-content-end' : 'justify-content-start'
          }`}
        >
          <span
            className={`chat-bubble mt-2 ${
              userMessage ? 'user-bubble' : 'recipient-bubble'
            }`}
          >
            {message.body}
          </span>
        </div>
      )
    })

  render() {
    return (
      <Container className="route-container">
        <div className="pl-3 pr-3">{this.renderMessages()}</div>
        <div className="chat-input border-top pt-3 pl-3 pr-3 d-flex justify-content-center align-items-center">
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
