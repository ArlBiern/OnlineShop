import { EMAIL_SUCCESS, EMAIL_FAIL } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case EMAIL_SUCCESS:
      return [...state, 1];
    case EMAIL_FAIL:
      return [...state, 2];
    default:
      return state;
  }
};