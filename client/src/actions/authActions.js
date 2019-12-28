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
  // user loading - wywołamy naszego reducera
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
}
