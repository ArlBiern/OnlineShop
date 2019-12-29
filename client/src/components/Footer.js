import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>Copyright 2020 ThinkTree <img src="/img/logo_xs.png" alt="" /></p>
      <div>
        <Link to="/delivery">Dostawa</Link>
        <Link to="/warranty">Gwarancja</Link>
        <Link to="/regulations">Regulamin</Link>
        <Link to="/privacy">Polityka prywatności</Link>
      </div>
    </footer>
  )
}

export default Footer;