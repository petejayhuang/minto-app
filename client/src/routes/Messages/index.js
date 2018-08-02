import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getMessageThreads } from '../../actions/messages'

import TouchableRow from '../../components/TouchableRow'

const Container = styled.div``

class Messages extends Component {
  componentDidMount() {
    this.props.getMessageThreads()
  }

  render() {
    const { threads } = this.props.messages
    return (
      <Container>
        <div className="route-container">
          {threads.map(thread => {
            const { ThreadParticipants, name, product_id, thread_id } = thread
            ThreadParticipants['0'].User.username
            return (
              <TouchableRow
                key={thread_id}
                text={name}
                to={`/messages/${thread_id}`}
              />
            )
          })}
        </div>
      </Container>
    )
  }
}

export default connect(
  ({ messages }) => ({ messages }),
  { getMessageThreads }
)(Messages)
