import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>Copyright 2019 ThinkTree</p>
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