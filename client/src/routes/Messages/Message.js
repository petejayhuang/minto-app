import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessageThread, createMessage } from '../../actions/'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  .chat-input {
    position: absolute;
    bottom: 50px;
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
  }

  renderMessages = () => {
    return this.props.messages.currentThread.map(message => (
      <p
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
      <Container className="route-container pl-3 pr-3">
        {this.renderMessages()}

        <div className="chat-input d-flex">
          <input type="text" onChange={this.handleInputChange} />
          <button onClick={this.handleSend}>Send</button>
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
