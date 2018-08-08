const URLS = {
  SERVER:
    process.env.NODE_ENV === 'production'
      ? 'https://jwl-be-master.herokuapp.com/api/v1'
      : 'https://jwl-be-staging.herokuapp.com/api/v1'
}

const KEYS = {}

const FACEBOOK_APP_ID = 1771048822975022

export { URLS, KEYS, FACEBOOK_APP_ID }
