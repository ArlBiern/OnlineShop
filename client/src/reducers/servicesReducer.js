import { GET_SERVICES } from '../actions/types';

const servicesData = [
  {
    title: 'Wykonanie szkiców, portretów, obrazów w dowolnej stylizacji',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    price: '200 - 1200zł (zależna od wielkości, czasochłonności oraz wybranej techniki)',
    image: '/img/obrazy.png'
  },
  {
    title: 'Przygotowanie przedmiotów według Twojego pomysłu',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 'Zależna od wielkości przedmiotu, czasochłonności wykonania i materiałów',
    image: '/img/personalizacja.png'
  },
  {
    title: 'Wykonanie obrazów naściennych',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Se cillum dolore eu fugiat nulla pariatur.',
    price: '150 - 400 zł/m² (zależna od skomplikowania wzoru)',
    image: '/img/obrazy_nascienne.png'
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
