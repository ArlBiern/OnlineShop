import { GET_SERVICES } from '../actions/types';

const servicesData = [
  {
    title: 'Wykonanie szkiców, portretów, obrazów w dowolnej stylizacji',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    price: '50 - 1000zł (zależna od wielkości, czasochłonności oraz wybranej techniki)',
    image: '/img/obrazy.png',
    link: '/services/custom_paintings'
  },
  {
    title: 'Przygotowanie przedmiotów według Twojego pomysłu',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 'Zależna od wielkości przedmiotu, czasochłonności wykonania i materiałów',
    image: '/img/personalizacja.png',
    link: '/contact'
  },
  {
    title: 'Wykonanie obrazów naściennych',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Se cillum dolore eu fugiat nulla pariatur.',
    price: '150 - 400 zł/m² (zależna od skomplikowania wzoru)',
    image: '/img/obrazy_nascienne.png',
    link: '/contact'
  },
];

const initialState = {
  servicesData,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return { ...state, servicesData: state.servicesData };
    default:
      return state;
  }
}
