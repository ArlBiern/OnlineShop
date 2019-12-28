import streams from '../apis/streams';
import { REGISTER_USER, LOGIN_USER } from './types';

// Used with redux-forms
export const createUser = formValues => async dispatch => {
  streams
    .post('/registration', formValues)
    .then(res => {
      dispatch({
        type: REGISTER_USER, 
        peyload: res.data
      })
    })
    .catch( err => console.log(err));
};

// Not working Correctly!!!
export const loginUser = formValues => async dispatch => {
  streams
    .post('/login', formValues)
    .then(res => {
      dispatch({
        type: LOGIN_USER, 
        peyload: res.data
      })
    })
    .catch(err => console.log(err));
}; 