import React from 'react'

const ImageSlide = ({ image: { image_URL, image_description } }) => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      maxHeight: '600px',
      minHeight: '600px',
      backgroundImage: `url(${image_URL})`,
      backgroundSize: 'cover'
    }}
  />
)

export default ImageSlide
