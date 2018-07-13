import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .chat-block {
    width: 100%;
  }
  .chat-max {
    width: 80%;
    background: lightblue;
  }
  .chat-bubble {
  }
`

const ChatBubble = props => {
  const { text, right } = props
  return (
    <Container>
      <div
        className={`chat-block d-flex justify-content-${
          right ? 'end' : 'start'
        } text-${right ? 'right' : 'left'} mb-2`}
      >
        <div className="chat-max">
          <div className="">
            <p className=" chat-bubble p-1">{text}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ChatBubble
