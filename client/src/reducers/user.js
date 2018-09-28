import { AUTHENTICATE_SUCCESS, UPDATE_USER_SUCCESS } from "../actions/types";

const INITIAL_STATE = { addresses: { rows: [] } };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return { ...state, ...action.payload };
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
