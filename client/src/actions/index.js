import streams from '../apis/streams';
import { REGISTER_USER } from './types';


export const createUser = formValues => async dispatch => {
  streams
    .post('/registration', formValues)
    .then(res => {
      dispatch({
        type: REGISTER_USER, 
        peyload: res.data
      })
    }
    )
    .catch( err => console.log(err));
};

export const fetchProducts = () => async dispatch => {
  const response = await streams.get('/products');
  dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
};

export const fetchProduct = (id) => async dispatch => {
  const response = await streams.get(`/products/${id}`);
  dispatch({ type: 'FETCH_PRODUCT', payload: response.data });
};