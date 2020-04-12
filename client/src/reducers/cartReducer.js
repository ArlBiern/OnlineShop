import { FETCH_CART, DELETE_CART, DELETE_CART_ERROR } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.payload;
    case DELETE_CART:
      return action.payload;
    case DELETE_CART_ERROR:
      return action.payload;
    default:
      return state;
  }
};
