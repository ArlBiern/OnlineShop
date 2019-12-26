import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <div>
        <Link to="/registration">Rejestracja</Link>
        <Link to="/login">Logowanie</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/aboutUs">O nas</Link>
        <Link to="/shop">Sklep</Link>
        <Link to="/services">Usługi</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
    </nav>
  )
}

export default Navigation;