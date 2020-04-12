import streams from '../apis/streams';
import { tokenConfig } from './helper';
import { SAVE_ORDER_SUCCESS, SAVE_ORDER_FAIL, DELETE_ORDER_STATUS } from './types';
import { returnErrors } from './errorActions';
import { deleteCart } from './cartActions';


export const saveOrder = (orderData, cart_id) => async (dispatch, getState) => {
  streams
    .post('/order', orderData, tokenConfig(getState))
    .then( res => {
      dispatch({
        type: SAVE_ORDER_SUCCESS,
      })
      dispatch(deleteCart(cart_id))
    })
    .catch( err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ORDER_SAVE_FAIL'));
        dispatch({
          type: SAVE_ORDER_FAIL,
        });
      }
    });
};

export const deleteOrderStatus = () => {
  return {
    type: DELETE_ORDER_STATUS
  }
}

/* export const getOrders = orderData => async dispatch => {

}; */

