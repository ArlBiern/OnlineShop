import { GET_SERVICES } from '../actions/types';

const servicesData = [
  {
    title: 'Usługa 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 500,
    image: '/img/products/kolczyki_ludek.png'
  },
  {
    title: 'Usługa 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 300,
    image: '/img/products/zyrandol_mozaika.png'
  },
  {
    title: 'Usługa 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 150,
    image: '/img/products/poduszka_chmurka.png'
  }
]

const initialState = {
  servicesData: servicesData
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return Object.assign({}, state, {servicesData: state.servicesData});
    default:
      return state;
  }
}
