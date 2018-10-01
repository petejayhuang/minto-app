import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getMessageThreads } from '../../actions/messages'
import { redirect } from '../../actions/'

import { TouchableRow } from '../../components/TouchableRow'
import requireAuth from '../../components/HigherOrder/requireAuth'

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
          {threads.map((thread, i) => {
            const { product_id, thread_id, ThreadParticipants } = thread

            return (
              <TouchableRow.InternalLink
                borderBottom={i + 1 === threads.length}
                key={thread_id}
                text={`${
                  ThreadParticipants[0].User.username
                } about the product ${product_id}`}
                to={`/messages/${thread_id}`}
              />
            )
          })}
        </div>
      </Container>
    )
  }
}

export default compose(
  connect(
    ({ user, messages }) => ({ user, messages }),
    { getMessageThreads, redirect }
  ),
  requireAuth
)(Messages)
