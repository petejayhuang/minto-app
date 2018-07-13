import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessageThread, createMessage } from '../../actions/'
import { withRouter } from 'react-router-dom'

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

  render() {
    return (
      <div className="route-container pl-3 pr-3">
        {this.props.messages.currentThread.map(message => {
          return <div>{message.body}</div>
        })}

        <label>Your message</label>
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.handleSend}>Send</button>
      </div>
    )
  }
}

const mapState = ({ messages }) => ({ messages })

export default connect(
  mapState,
  { getMessageThread, createMessage }
)(withRouter(Message))
