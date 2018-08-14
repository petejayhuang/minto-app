const URLS = {
  SERVER:
    process.env.NODE_ENV === 'production'
      ? 'https://minto-api-master.herokuapp.com/api/v1'
      : 'https://minto-api-staging.herokuapp.com/api/v1'
}

const KEYS = {}

const FACEBOOK_APP_ID = 1771048822975022

export { URLS, KEYS, FACEBOOK_APP_ID }
