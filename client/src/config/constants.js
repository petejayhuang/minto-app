const production = process.env.APP_ENV === 'production'

const DURATIONS = {
  GET_USERNAME_AVAILABILITY_DEBOUNCE_DURATION: 1000,
  REQUEST_TIME_OUT: 7000
}

const KEYS = {
  STRIPE_PUBLISHABLE_KEY: production
    ? 'pk_live_5uReDOhCDfRzLstLJbKp6dl8'
    : 'pk_test_wS2oT1BwH2QrgLF3QT4tTthY'
}

const URLS = {
  SERVER: production
    ? 'https://minto-api-master.herokuapp.com/api/v1'
    : 'https://minto-api-staging.herokuapp.com/api/v1'
}

const FACEBOOK_APP_ID = 1771048822975022

export { URLS, KEYS, FACEBOOK_APP_ID, DURATIONS }
