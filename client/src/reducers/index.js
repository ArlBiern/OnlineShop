import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import productReducer from './productReducer';

export default combineReducers({
  form: formReducer,
  products: productsReducer,
  product: productReducer,
  error: errorReducer,
  auth: authReducer
});
