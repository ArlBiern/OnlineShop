import streams from '../apis/streams';
import { EMAIL_SUCCESS, EMAIL_FAIL } from './types';

export const sendEmail = formValues => dispatch => {
  streams
    .post('/contact', formValues)
    .then(res => {
      dispatch({
        type: EMAIL_SUCCESS
      })
    })
    .catch(err => {
      console.log(err);
      if (err) {
        dispatch({
          type: EMAIL_FAIL
        })
      }
    });
}