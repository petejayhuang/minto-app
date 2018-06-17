import React from "react"

const Dropdown = props => {
  console.log("props in dropdown", props)
  return (
    <select onChange={e => props.handleOption(e)}>
      {props.options.map(option => (
        <option key={option.product_type}>{option.product_type}</option>
      ))}
    </select>
  )
}

export default Dropdown
