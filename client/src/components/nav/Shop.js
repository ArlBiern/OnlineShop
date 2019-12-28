import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import '../../styles/Shop.css';

class Shop extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProductsList() {
    if (this.props.products.length !== 0) {
      return this.props.products.map(product => {
        return (
          <div className="product_box" key={product._id}>
            <h3>{product.name}</h3>
            <img className="product_img" src={product.photo} alt={product.name} />
            <p>{product.price} zł</p>
            <div className="button_box">
              <a className="main_button" href="#">Zobacz</a>
              <Link to="/cart" className="product_cart"><img src="/img/cart.png" alt="ikona koszyk" /></Link>
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
        {console.log(this.props.products, this.props.products.length)}
        <div className="products_container">
          {this.renderProductsList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
}

export default connect(mapStateToProps, { fetchProducts })(Shop);