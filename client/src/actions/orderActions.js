import streams from '../apis/streams';
import { tokenConfig } from './helper';
import { SAVE_ORDER_SUCCESS, /*GET_ORDERS,*/ SAVE_ORDER_FAIL } from './types';
import { returnErrors } from './errorActions';


export const saveOrder = orderData => async (dispatch, getState) => {
  streams
    .post('/order', orderData, tokenConfig(getState))
    .then( res => {
      dispatch({
        type: SAVE_ORDER_SUCCESS,
      })
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

/* export const getOrders = orderData => async dispatch => {

}; */

