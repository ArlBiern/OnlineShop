import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../actions';
import '../styles/Product.css';

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  renderProduct = () => {
    const product = this.props.product;

    if (!product.name) {
      return (
        <h1>Produkt o wskazanym ID nie istnieje</h1>
      )
    } else {
      return (
        <div>
          <h1>{product.name}</h1>
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
                <Link to="/cart" className="product_cart"><img src="/img/cart.png" alt="ikona koszyk" /></Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderProduct()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { product: state.product }
}

export default connect(mapStateToProps, {fetchProduct})(Product);