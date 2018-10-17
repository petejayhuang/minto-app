import React from 'react'

const ImageSlide = ({ image: { image_URL } }) => {
  console.log('<ImageSlide />')
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        maxHeight: '500px',
        maxWidth: '600px',
        minHeight: '400px',
        backgroundImage: `url(${image_URL})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}
export default ImageSlide
