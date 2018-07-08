// This component receives:
// values (an array of objects)
// and match (react-router object)

// It is opinionated in the fact that Link clicks will route to name of "/:valueName/:id", e.g. categories/id

import React from 'react'
import { Link } from 'react-router-dom'

export const renderTable = ({ values, match }) => {
  if (values.length > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm">
          {generateTableHeader({ values })}
          {generateTableBody({
            match,
            values
          })}
        </table>
      </div>
    )
  }
}

const generateTableHeader = ({ values }) => (
  <thead>
    <tr>
      {Object.keys(values[0]).map(heading => <th key={heading}>{heading}</th>)}
    </tr>
  </thead>
)

const generateTableBody = ({ match, values }) => {
  // find the keys of a particular value.
  // e.g. category_id, category_name, description
  const keysOfOneValue = Object.keys(values[0])

  // retrieve the key that contains the '_id' key
  const idName = keysOfOneValue.filter(key => key.indexOf('_id') > 0)

  return (
    <tbody>
      {values.map(value => (
        <tr key={value[idName[0]]}>
          <td>
            <Link to={`${match.path}/${value[idName[0]]}`}>
              {value[idName[0]]}
            </Link>
          </td>
          {keysOfOneValue.slice(1).map(keyOfOneValue => (
            <td key={keyOfOneValue}>
              <Link to={`${match.path}/${value[idName[0]]}`}>
                {value[keyOfOneValue]}
              </Link>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
