import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import productsReducer from './productsReducer';

export default combineReducers({
  form: formReducer,
  products: productsReducer
});
