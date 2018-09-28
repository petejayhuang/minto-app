const capitaliseFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

const capitaliseSentence = string =>
  string
    .split(' ')
    .map(word => capitaliseFirstLetter(word))
    .join(' ')

export { capitaliseFirstLetter, capitaliseSentence }
