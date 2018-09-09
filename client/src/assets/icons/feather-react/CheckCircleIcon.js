import React from 'react'

const CheckCircleIcon = ({ width, height, fill, stroke, strokeWidth }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-check-circle"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

CheckCircleIcon.defaultProps = {
  fill: 'none',
  stroke: 'black',
  strokeWidth: '2'
}

export default CheckCircleIcon
