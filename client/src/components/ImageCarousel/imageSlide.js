import React from 'react'

const ImageSlide = ({ image: { image_URL, image_description } }) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      maxHeight: '400px',
      minHeight: '400px',
      backgroundImage: `url(${image_URL})`,
      backgroundSize: 'cover'
    }}
  />
)

export default ImageSlide
