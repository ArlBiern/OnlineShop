import { 
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS, 
  REGISTER_FAIL, 
  REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null, 
  isLoading: false, 
  user: null, 
  didRegister: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state, 
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false, 
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state, 
        ...action.payload,
        isAuthenticated: true, 
        isLoading: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state, 
        didRegister: true
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token'); 
      return {
        ...state, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false,
        user: null, 
        didRegister: false
      } 
    default:
      return state
  }
}