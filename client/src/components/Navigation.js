import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { logoutUser } from '../actions/authActions';
import { fetchCart } from '../actions/cartActions';

class Navigation extends React.Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  getCart = () => {
    if (this.props.isAuthenticated) {
      this.props.fetchCart();
    } else {
      alert('Musisz się zalogować żeby zajrzeć do koszyka');
    }
  }

  renderPersonalizedNav() {
    if (!this.props.isAuthenticated) {
      return (
        <ul>
          <li><Link to="/registration">Rejestracja</Link></li>
          <li><Link to="/login">Logowanie</Link></li>
        </ul>
      );
    }
    return (
      <ul>
        <li>Witaj <span>{this.props.user.name}</span></li>
        <li><Link to="/cart" onClick={this.getCart} className="cart"><img src="/img/cart.png" alt="ikona koszyk" /></Link></li>
        <li><Link to="/" onClick={this.handleLogout}>Wyloguj</Link></li>
      </ul>
    );
  }

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
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logoutUser, fetchCart })(Navigation);
