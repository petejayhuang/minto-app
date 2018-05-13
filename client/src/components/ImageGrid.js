import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  flex-wrap: wrap;
  .image-grid {
    max-width: 900px;
    width: 100%;
  }
  .feed-photo {
    border: 1px solid lightgray;
    background-color: lightgray;
    height: 32vw;
    width: 32vw;
    max-width: 290px;
    max-height: 290px;
  }
`

const ImageGrid = () => {
  return (
    <Container className="flex-row justify-center">
      <div className="flex-column image-grid">
        <div className="flex-row justify-between">
          {[11, 22, 33].map(item => {
            return <div key={item} className="feed-photo" />
          })}
        </div>

        <div style={{ marginTop: "1vw" }} className="flex-row justify-between">
          {[1, 2, 3].map(item => {
            return <div key={item} className="feed-photo" />
          })}
        </div>
      </div>
    </Container>
  )
}

ImageGrid.propTypes = {}

ImageGrid.defaultProps = {}

export default ImageGrid
