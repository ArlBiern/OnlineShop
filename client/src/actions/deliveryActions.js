import { SET_DELIVERY } from './types';

export const setDelivery = (deliveryData) => {
  return {
    type: SET_DELIVERY,
    data: deliveryData
  }
};

