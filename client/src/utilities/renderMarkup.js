import React from 'react'

const renderMarkup = sections =>
  sections.map(section => {
    const { element, content } = section
    return React.createElement(element, { key: content }, content)
  })

export default renderMarkup
