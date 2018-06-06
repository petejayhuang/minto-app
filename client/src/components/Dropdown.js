import React from 'react'

const Dropdown = props => {
  return (
    <select onChange={e => props.handleOption(e)}>
      {props.options.map(option => <option>{option.product_type}</option>)}
    </select>
  )
}

export default Dropdown
