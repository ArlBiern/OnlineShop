import streams from '../apis/streams';
import { tokenConfig } from './helper';
import { FETCH_CART } from './types';

export const fetchCart = () => async (dispatch, getState) => {
  const response = await streams.get('/cart', tokenConfig(getState));
  dispatch({ type: FETCH_CART, payload: response.data });
};

export const addProduct = product_id => (dispatch, getState) => {
  streams
    .post('/cart', {'product': product_id}, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => console.log(err));
};

export const deleteProduct = product_id => (dispatch, getState) => {
  streams
    .delete(`/cart/product/${product_id}`, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => console.log(err));
};

export const changeProductQuantity = (product_id, quantity) => (dispatch, getState) => {
  streams
    .put('/cart/quantity', {'product': product_id, 'quantity': quantity}, tokenConfig(getState))
    .then(res => dispatch(fetchCart()))
    .catch(err => console.log(err));
};

