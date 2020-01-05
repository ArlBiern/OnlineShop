import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProducts } from '../../actions';
import { addProduct } from '../../actions/cartActions';
import { clearErrors, returnErrors } from '../../actions/errorActions';
import '../../styles/Shop.css';


class Shop extends React.Component {
  state = { alertMsg: null }

  componentDidMount() {
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.appErrors !== prevProps.appErrors) {
      if (this.props.appErrors.id === 'UNAUTH_PRODUCT_ADD') {
        this.setState({ alertMsg: this.props.appErrors.msg });
        window.scrollTo(0, 0);
      }
    }
  }

  addToCart = e => {
    this.props.addProduct(e.currentTarget.value);

    if (this.props.appErrors.id === 'UNAUTH_PRODUCT_ADD') {
      this.setState({ alertMsg: this.props.appErrors.msg });
    }

    if (this.props.state.auth.isAuthenticated) {
      this.props.history.push('/cart');
    }
  }

  renderProductsList() {
    if (this.props.state.products.length !== 0) {
      return this.props.state.products.map(product => {
        return (
          <div className="product_box" key={product._id}>
            <h3>{product.name}</h3>
            <img className="product_img" src={product.photo} alt={product.name} />
            <p>{product.price} zł</p>
            <div className="button_box">
              <Link to={`/products/${product._id}`} className="main_button">Zobacz</Link>
              <button onClick={this.addToCart} value={product._id} className="product_cart" type="button" aria-label="Add to cart"><img src="/img/cart.png" alt="ikona koszyk" /></button>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <h2>W oczekiwaniu na produkty :-)...</h2>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Nasze produkty</h1>
        <div>
          { this.state.alertMsg ? <p className="error_box">{this.state.alertMsg}</p> : null }
        </div>
        <div className="products_container">
          {this.renderProductsList()}
        </div>
      </div>
    );
  }
}

Shop.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  appErrors: PropTypes.shape({
    msg: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    id: PropTypes.string,
  }).isRequired,
  state: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ])).isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.object.isRequired,
    PropTypes.func.isRequired,
  ])).isRequired,
};

const mapStateToProps = (state) => {
  return {
    state,
    appErrors: state.error,
  };
};

export default connect(mapStateToProps, {
  fetchProducts, addProduct, returnErrors, clearErrors,
})(Shop);
