import { AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin'
import axios from 'axios'

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params

    axios({
      url: 'https://jwl-be-staging.herokuapp.com/admin/v1/auth/login',
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
      }
      console.log(response)
      return response.json()
    })

    // .then(({ token }) => {
    //   localStorage.setItem('token', token)
    // })
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token')
    return Promise.resolve()
  }

  return Promise.resolve()
}
