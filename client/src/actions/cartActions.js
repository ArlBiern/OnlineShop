import streams from '../apis/streams';
import { tokenConfig } from './helper';
import { FETCH_CART, DELETE_CART, AUTH_ERROR } from './types';
import { returnErrors } from './errorActions';

export const fetchCart = () => async (dispatch, getState) => {
  const response = await streams.get('/cart', tokenConfig(getState));
  dispatch({ type: FETCH_CART, payload: response.data });
};

export const deleteCart = cart_id => (dispatch, getState) => {
  streams
    .delete(`/cart/${cart_id}`, tokenConfig(getState))
    .then(res => dispatch({
      type: DELETE_CART
    }))
    /* .catch(err => {
      if (err) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      } 
    }) */
};

export const addProduct = product_id => (dispatch, getState) => {
  streams
    .post('/cart', { product: product_id }, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => {
      if (err) {
        dispatch(returnErrors(err.response.data.msg, err.response.status, 'UNAUTH_PRODUCT_ADD'));
        dispatch({
          type: AUTH_ERROR,
        });
      }
    });
};

export const deleteProduct = product_id => (dispatch, getState) => {
  streams
    .delete(`/cart/product/${product_id}`, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => {
      if (err) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      }
    });
};

export const changeProductQuantity = (product_id, quantity) => (dispatch, getState) => {
  streams
    .put('/cart/quantity', { product: product_id, quantity }, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => {
      if (err) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      }
    });
};
