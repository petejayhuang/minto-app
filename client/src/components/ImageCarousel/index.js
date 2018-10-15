import React, { Component, Fragment } from 'react'
import Button from '../Button'
import ImageSlide from './imageSlide'

class ImageCarousel extends Component {
  state = {
    images: this.props.images,
    index: 0
  }

  incrementSlide = increment => {
    const { index, images } = this.state
    if (increment > 0 && index === images.length - 1) {
      return this.setState({ index: 0 })
    }

    if (increment < 0 && index === 0) {
      return this.setState({ index: images.length - 1 })
    }

    this.setState({ index: index + increment })
  }

  render() {
    const { images, index } = this.state
    console.log(images.length)
    return (
      <Fragment>
        <ImageSlide image={images[index]} />

        {images.length > 1 && (
          <div className="d-flex justify-content-center mt-2 mb-3">
            <Button
              secondary
              handleClick={() => {
                this.incrementSlide(-1)
              }}
              text="Previous Image"
            />
            <Button
              secondary
              className="ml-2"
              text="Next Image"
              handleClick={() => {
                this.incrementSlide(1)
              }}
            />
          </div>
        )}
      </Fragment>
    )
  }
}

export default ImageCarousel
