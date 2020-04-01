import { FETCH_CART, DELETE_CART } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.payload;
    case DELETE_CART:
      return action.payload;
    default:
      return state;
  }
};
