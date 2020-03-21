import { SET_DELIVERY } from '../actions/types';

const initialState = {
  deliveryData: {
    delivery_method: '',
    name: '',
    address: '',
    postal_code: '',
    city: '', 
    email: '',
    phone: ''
  }, 
  paymentMethod: 'Przelew internetowy',
  deliveryPrices: {
    'Kurier': 0,
    'Dostawa osobista': 0, 
    'Paczkomat Inpost': 0
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DELIVERY:
      return {
        ...state, 
        deliveryData: {
          delivery_method: action.data.delivery_method, 
          name: action.data.name,
          address: action.data.address,
          postal_code: action.data.postal_code,
          city: action.data.city,
          email: action.data.email,
          phone: action.data.phone 
        }
      }
    default:
      return state;
  }
};