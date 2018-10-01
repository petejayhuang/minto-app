import React from 'react'

const Checkbox = ({ checked, label, handleCheckbox }) => (
  <div className="d-flex align-items-center mt-4">
    <input id={label} onChange={handleCheckbox} type="checkbox" />
    <label for={label} className="mb-0 ml-1">
      {label}
    </label>
  </div>
)

export default Checkbox
