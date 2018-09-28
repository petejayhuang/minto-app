import React, { Fragment } from 'react'
import { func, string } from 'prop-types'

const TextInput = ({
  name,
  label,
  value,
  placeholder,
  required,
  handleChange,
  type
}) => (
  <Fragment>
    <label className="mt-4 mb-0">{label}</label>
    <input
      onChange={e => handleChange({ value: e.target.value, name })}
      type={type ? type : 'text'}
      value={value}
      required={required}
      placeholder={placeholder}
    />
  </Fragment>
)

TextInput.propTypes = {
  handleChange: func.isRequired,
  placeholder: string,
  type: string,
  value: string.isRequired
}

export default TextInput
