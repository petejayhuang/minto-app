import { AUTHENTICATE_SUCCESS, UPDATE_USER_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  addresses: [
    {
      id: 1,
      user_id: 17,
      address_type: 'delivery',
      address_name: 'Shoreditch Home',
      address1: 'Flat 5',
      address2: '176 Shoreditch High Street',
      address3: null,
      address4: null,
      city: 'London',
      county: null,
      postcode: 'E1 6AX',
      country: 'United Kingdom',
      country_code: 'UK',
      primary_YN: false,
      created_at: '2018-09-26T07:42:56.000Z',
      updated_at: '2018-09-26T07:54:59.000Z'
    }
  ]
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return { ...state, ...action.payload }
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
