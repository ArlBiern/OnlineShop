import { 
  SAVE_ORDER_SUCCESS, 
  SAVE_ORDER_FAIL,
  DELETE_ORDER_STATUS
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
        didOrderFailToSave: false,
      };
    case SAVE_ORDER_FAIL:
      return {
        ...state, 
        didOrderTryToSave: true, 
        didOrderSave: false,
        didOrderFailToSave: true,
      }
    case DELETE_ORDER_STATUS:
      return {
        ...state, 
        didOrderTryToSave: false, 
        didOrderSave: false,
        didOrderFailToSave: false,
      }
    default: 
      return state;
  }
}