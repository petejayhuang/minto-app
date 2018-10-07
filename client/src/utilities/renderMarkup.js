import React from 'react'

const fakeData = [
  { order: 1, element: 'h1', content: 'What is Lorem Ipsum?' },
  {
    order: 2,
    element: 'p',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...'
  },
  { order: 3, element: 'h2', content: 'Where does it come from?' },
  {
    order: 4,
    element: 'p',
    content:
      ' piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure'
  },
  {
    order: 5,
    element: 'p',
    content:
      '.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes'
  }
]

const renderMarkup = sections =>
  sections.map(section => {
    const { element, content } = section
    return React.createElement(element, null, content)
  })

export default renderMarkup
