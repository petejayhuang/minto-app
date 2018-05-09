import React from "react"

const ChevronRightIcon = ({ fill, stroke, strokeWidth }) => (
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
    className="feather feather-chevron-right"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

ChevronRightIcon.defaultProps = {
  fill: "none",
  stroke: "black",
  strokeWidth: "2"
}

export default ChevronRightIcon
