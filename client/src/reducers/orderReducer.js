import { 
  SAVE_ORDER_SUCCESS, 
  GET_ORDERS, 
  SAVE_ORDER_FAIL
} from '../actions/types';

const initialState = {
  didOrderTryToSave: false, 
  didOrderSave: false,
  didOrderFailToSave: false, 
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_ORDER_SUCCESS:
      return {
        ...state, 
        didOrderTryToSave: true, 
        didOrderSave: true,
      };
    case SAVE_ORDER_FAIL:
      return {
        ...state, 
        didOrderTryToSave: true, 
        didOrderSave: false,
      }
    default: 
      return state;
  }
}