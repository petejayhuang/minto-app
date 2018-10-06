import axios from 'axios'
import { URLS, DURATIONS } from '../config/constants'

const configuredAxios = () => {
  let headers = {}

  headers['x-auth-token'] = localStorage.getItem('x-auth-token')

  return axios.create({
    baseURL: URLS.SERVER,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    timeout: DURATIONS.REQUEST_TIME_OUT
  })
}

export default configuredAxios
