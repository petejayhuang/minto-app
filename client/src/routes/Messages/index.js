import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getMessageThreads } from '../../actions/messages'
import { redirect } from '../../actions/'

import TouchableRow from '../../components/TouchableRow'

const Container = styled.div``

class Messages extends Component {
  componentDidMount() {
    const { user, redirect, getMessageThreads } = this.props
    if (!user.id) {
      redirect('/login')
    } else {
      getMessageThreads()
    }
  }

  render() {
    const { threads } = this.props.messages
    return (
      <Container>
        <div className="route-container">
          {threads.map(thread => {
            const { name, thread_id } = thread

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
  ({ user, messages }) => ({ user, messages }),
  { getMessageThreads, redirect }
)(Messages)
