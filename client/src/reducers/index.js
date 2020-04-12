import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import servicesReducer from './servicesReducer';
import contactReducer from './contactReducer';
import cartReducer from './cartReducer';
import deliveryReducer from './deliveryReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  form: formReducer,
  products: productsReducer,
  product: productReducer,
  error: errorReducer,
  auth: authReducer,
  services: servicesReducer,
  contact: contactReducer,
  cartData: cartReducer,
  delivery: deliveryReducer, 
  orderStatus: orderReducer
});
