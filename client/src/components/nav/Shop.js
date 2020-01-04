import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import { addProduct } from '../../actions/cartActions';
import '../../styles/Shop.css';

class Shop extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  addToCart = e => {
    if (this.props.state.auth.isAuthenticated) {
      this.props.addProduct(e.currentTarget.value);
      //this.props.dispatch(fetchProducts());
      this.props.history.push('/cart');
    } else {
      alert('Musisz się zalogować żeby dodać przedmiot do koszyka');
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
              <button onClick={this.addToCart} value={product._id} className="product_cart"><img src="/img/cart.png" alt="ikona koszyk" /></button>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div>
          <h2>W oczekiwaniu na produkty :-)...</h2>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Nasze produkty</h1>
        <div className="products_container">
          {this.renderProductsList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

export default connect(mapStateToProps, { fetchProducts, addProduct })(Shop);