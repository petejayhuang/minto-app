import React from 'react'

const ImageSlide = ({ image: { image_URL, image_description } }) => (
  <img alt={image_description} className="img-fluid" src={image_URL} />
)

export default ImageSlide
