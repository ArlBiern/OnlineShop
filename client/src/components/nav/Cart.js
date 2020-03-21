import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCart, deleteProduct, changeProductQuantity } from '../../actions/cartActions';
import '../../styles/Cart.css';
import Delivery from './cartComponents/Delivery';
import Payment from './cartComponents/Payment';
import OrderSummary from './cartComponents/OrderSummary';

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.state.auth.isAuthenticated) {
      if (this.props.state.cart.length === 0) {
       this.props.fetchCart();
      }
    }
  }

  onClickBuy(e) {
    const cartOrder = document.querySelector('.cart_order');
    cartOrder.classList.toggle('order_visible');
    
    if (e.target.innerText === "PRZEJDŹ DO OPCJI ZAMÓWIENIA") {
      e.target.innerText = "UKRYJ OPCJE ZAMÓWIENIA";
    } else {
      e.target.innerText = "PRZEJDŹ DO OPCJI ZAMÓWIENIA";
    }
  }

  changeQuantity = e => {
    const quantity = e.currentTarget.value;
    const product_id = e.currentTarget.dataset.id;
    if (quantity !== 0 && product_id) {
      this.props.changeProductQuantity(product_id, quantity);
    }
  }

  deleteFromCart = e => {
    this.props.deleteProduct(e.currentTarget.value);
    
    const cartOrder = document.querySelector('.cart_order');
    cartOrder.classList.remove('order_visible');

    const button = document.querySelector('.main_button.goToOrder');
    if (button.innerText === "UKRYJ OPCJE ZAMÓWIENIA") {
      button.innerText = "PRZEJDŹ DO OPCJI ZAMÓWIENIA";
    };

    window.location.reload(false);
  }

  renderUserData () {
    const user = this.props.state.cart.user;
    if (this.props.state.cart.length !== 0 && this.props.state.auth.isAuthenticated) {
      return (
        <ul>
          <li>{user.name} {user.surname}</li>
          <li>{user.address}</li>
          <li>{user.postal_code} {user.city}</li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
        </ul>
      );
    }

    return <p>W oczekiwaniu na dane</p>;
  }

  renderSum() {
    let sum = 0;
    const cart = this.props.state.cart;
    if (cart.length !== 0 && cart.items && cart.items.length !== 0 && this.props.state.auth.isAuthenticated) {
      cart.items.map(product => {
        return sum += (product.quantity * product.product.price);
      });
    } else {
      sum = 0;
    }
    return sum;
  }

  renderProductList() {
    const cart = this.props.state.cart;
    if (cart.length !== 0 && cart.items && cart.items.length !== 0 && this.props.state.auth.isAuthenticated) {
      return cart.items.map(product => {
        const total_price = product.quantity * product.product.price;
        return (
          <li key={product.product._id}>
            <span>{product.product.name}</span>
            <span>ilość: <input onChange={this.changeQuantity} type="number" min="1" max="20" data-id={product.product._id} value={product.quantity} /></span>
            <span>cena: {total_price}zł</span>
            <button value={product.product._id} onClick={this.deleteFromCart} type="button" aria-label="Usuń">
              <img src="/img/trash.png" alt="ikona kosz usuń" />
            </button>
          </li>
        );
      });
    }
    return <p>W oczekiwaniu na produkty</p>;
  }

  renderDelivery() {
    if (this.props.state.cart.user) {
      return (
        <div className="cart_order">
          <Delivery />
          <Payment />
          <OrderSummary />
        </div>
      )
    }
  }

  renderOrderOptionsButton() {
    if (this.props.state.auth.token !== null && this.props.state.cart.items) {
      if (this.props.state.cart.items.length > 0) {
        return (
          <div>
            <p className="price">Suma: {this.renderSum()}zł</p>
            <button className="main_button goToOrder" onClick={this.onClickBuy} type="button" aria-label="Przejdź do opcji zamówienia">Przejdź do opcji zamówienia</button>      
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div className="container cart">
        <div className="cart_mainView">
          <div className="user_data">
            <h3>Twoje dane</h3>
            {this.renderUserData()}
          </div>
          <div className="user_products">
            <h3>Twoje produkty</h3>
            <ul>
              {this.renderProductList()}
            </ul>
            {this.renderOrderOptionsButton()}
          </div>
        </div>
        {this.renderDelivery()}
      </div>
    );
  }
}

Cart.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  changeProductQuantity: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ])).isRequired,
};

const mapStateToProps = (state) => {
  return { state };
};


export default connect(mapStateToProps, { fetchCart, deleteProduct, changeProductQuantity })(Cart);
