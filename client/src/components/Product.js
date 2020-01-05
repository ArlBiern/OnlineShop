import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProduct } from '../actions';
import { addProduct } from '../actions/cartActions';
import '../styles/Product.css';

class Product extends React.Component {
  state = { alertMsg: null }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.appErrors !== prevProps.appErrors) {
      if (this.props.appErrors.id === 'UNAUTH_PRODUCT_ADD') {
        this.setState({ alertMsg: this.props.appErrors.msg });
        window.scrollTo(0, 0);
      }
    }
  }

  addToCart = () => {
    this.props.addProduct(this.props.match.params.id);

    if (this.props.appErrors.id === 'UNAUTH_PRODUCT_ADD') {
      this.setState({ alertMsg: this.props.appErrors.msg });
    }

    if (this.props.state.auth.isAuthenticated) {
      this.props.history.push('/cart');
    }
  }

  renderProduct = () => {
    const { product } = this.props.state;

    if (!product.name) {
      return (
        <h1>Produkt o wskazanym ID nie istnieje</h1>
      );
    }

    return (
      <div>
        <h1>{product.name}</h1>
        <div>
          { this.state.alertMsg ? <p className="error_box">{this.state.alertMsg}</p> : null }
        </div>
        <div className="product">
          <img className="product_img" src={product.photo} alt={product.name} />
          <div className="description">
            <p>{product.description}</p>
            <p><span>Czas realizacji:</span> {product.completion}</p>
            <p><span>Materiał:</span> {product.material}</p>
            <p><span>Montaż:</span> {product.montage}</p>
            <p><span>Wymiary:</span> waga: {product.weight}, wysokość: {product.height}, szerokość: {product.width}, długość: {product.length}</p>
            <div className="button_box">
              <p className="price"><span>Cena: </span>{product.price}zł</p>
              <button onClick={this.addToCart} className="product_cart" type="button" aria-label="Add to cart"><img src="/img/cart.png" alt="ikona koszyk" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderProduct()}
      </div>
    );
  }
}

Product.propTypes = {
  state: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ])).isRequired,
  fetchProduct: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  appErrors: PropTypes.shape({
    msg: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    id: PropTypes.string,
  }).isRequired,
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, { fetchProduct, addProduct })(Product);
