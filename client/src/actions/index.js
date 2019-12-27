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