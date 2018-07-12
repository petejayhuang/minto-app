import React from 'react'

const ChevronDownIcon = ({ fill, stroke, strokeWidth }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-up"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

ChevronDownIcon.defaultProps = {
  fill: 'none',
  stroke: 'black',
  strokeWidth: '2'
}

export default ChevronDownIcon
