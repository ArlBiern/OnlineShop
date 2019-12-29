import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { logoutUser } from '../actions/authActions';

class Navigation extends React.Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  renderPersonalizedNav() {
    if (!this.props.isAuthenticated) {
      return (
        <ul>
          <li><Link to="/registration">Rejestracja</Link></li>
          <li><Link to="/login">Logowanie</Link></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>Witaj <span>{this.props.user.name}</span></li>
          <li><Link to="/cart" className="cart"><img src="/img/cart.png" alt="ikona koszyk" /></Link></li>
          <li><Link to="/" onClick={this.handleLogout}>Wyloguj</Link></li>
        </ul>
      );
    }
  };

  render() {
    return (
      <nav>
        <Link className="logo" to="/">
          <img src="/img/logoB.png" alt="logo ThinkTree" />
        </Link>
        <div className="nav_box">
          {this.renderPersonalizedNav()}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutUs">O nas</Link></li>
            <li><Link to="/products">Sklep</Link></li>
            <li><Link to="/services">Usługi</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
          </ul>
        </div>
      </nav>
    );
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { logoutUser })(Navigation);
