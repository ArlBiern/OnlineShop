import streams from '../apis/streams';
import { returnErrors } from './errorActions';
import { tokenConfig } from './helper';

import { 
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS, 
  REGISTER_FAIL, 
  REGISTER_SUCCESS
} from './types';

// Check token on APP mount
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  streams.get('/login/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED, 
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    })
}; 

// Register user 
export const registerUser = formValues => dispatch => {
  streams
    .post('/registration', formValues)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS
      })
    })
    .catch(err => {
      console.log(err);
      if (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
          type: REGISTER_FAIL
        })
      }
    });
}

// Login user
export const loginUser = formValues => dispatch => {
  // config - maybe will be needed in case of basket - check it later!
  /* const config = {
    header: {
      'Content-Type': 'application/json'
    }
  } */

  streams
    .post('/login', formValues /*, config*/)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      if (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
          type: LOGIN_FAIL
        })
      }
    });
}

// Logout user
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS
  }
} 
