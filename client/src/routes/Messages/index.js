import React from 'react'
import styled from 'styled-components'

import TouchableRow from '../../components/TouchableRow'
import ChatBubble from '../../components/ChatBubble'

const fakeMessageData = [
  'Hello',
  'How are you?',
  "I'm well thank you, yourself?",
  'Very good'
]

const Container = styled.div``

const Messages = props => {
  return (
    <Container>
      <div className="route-container">
        <TouchableRow text="Justin Lai" to="/messages/justinlai" />
        <div className="pt-2" />
      </div>
    </Container>
  )
}

export default Messages
