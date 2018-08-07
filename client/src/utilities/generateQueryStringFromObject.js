export const generateQueryStringFromObject = object => {
  return Object.keys(object).reduce((accumulator, key) => {
    if (object[key]) {
      return `${accumulator}&${[key]}=${object[key]}`
    }
    return accumulator
  }, '')
}
