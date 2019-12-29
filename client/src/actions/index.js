import streams from '../apis/streams';

export const fetchProducts = () => async dispatch => {
  const response = await streams.get('/products');
  dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
};

export const fetchProduct = (id) => async dispatch => {
  const response = await streams.get(`/products/${id}`);
  dispatch({ type: 'FETCH_PRODUCT', payload: response.data });
};
