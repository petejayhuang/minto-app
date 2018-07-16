import axios from 'axios'
import { URLS } from '../config/constants'

const configuredAxios = () => {
  let headers = {}

  headers['x-auth-token'] = localStorage.getItem('x-auth-token')

  return axios.create({
    baseURL: URLS.SERVER,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

export default configuredAxios
