import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  flex-wrap: wrap;
`

class ImageGrid extends React.PureComponent {
  render() {
    return (
      <div className="d-flex justify-content-between">
        {[11, 22, 33].map(item => {
          return <div key={item} className="feed-photo" />
        })}
      </div>
    )
  }
}
ImageGrid.propTypes = {}

ImageGrid.defaultProps = {}

export default ImageGrid
