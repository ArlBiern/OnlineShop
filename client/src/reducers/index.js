import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  form: formReducer,
  error: errorReducer,
  auth: authReducer
});
