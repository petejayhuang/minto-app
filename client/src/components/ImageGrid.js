import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  flex-wrap: wrap;
  .image-grid {
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

const ImageGrid = () => (
  <Container className="d-flex justify-content-center">
    <div className="d-flex flex-column image-grid">
      <div className="d-flex justify-content-between">
        {[11, 22, 33].map(item => {
          return <div key={item} className="feed-photo" />
        })}
      </div>
    </div>
  </Container>
)

ImageGrid.propTypes = {}

ImageGrid.defaultProps = {}

export default ImageGrid
