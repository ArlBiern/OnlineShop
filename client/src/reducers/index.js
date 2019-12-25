import { combineReducers } from 'redux';

const testReducer = () => [{ test: 'This is my test string' }];

export default combineReducers({
  test: testReducer,
});
