// dirty function?! clean up

import { matchPath } from 'react-router'

const findNavItem = location => {
  if (location) {
    const { pathname, search } = location
    const firstSlash = pathname.split('/')[1]
    const match = matchPath(pathname, {
      path: `/${firstSlash}/:id`
    })
    const paramsExist = match && match.params ? true : false
    let navItem = ''

    // if params don't exist, just go to that route
    if (!paramsExist) {
      navItem = firstSlash
    }

    if (paramsExist) {
      // we assume it's a number
      navItem = `${firstSlash}/:id`
      // settings pages are unique
      if (firstSlash === 'settings') {
        navItem = pathname
      }
    }

    if (search) {
      navItem = firstSlash
    }
    return navItem
  } else {
    return '/'
  }
}

export default findNavItem
