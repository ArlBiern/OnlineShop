import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCart, deleteProduct, changeProductQuantity } from '../../actions/cartActions';
import { setDelivery } from '../../actions/deliveryActions';
import { deleteOrderStatus } from '../../actions/orderActions';
import '../../styles/Cart.css';
import Delivery from './cartComponents/Delivery';
import Payment from './cartComponents/Payment';
import OrderSummary from './cartComponents/OrderSummary';

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated && this.props.cartData.length === 0) {
      this.props.fetchCart();
    }
    //this.handleOrderInfoModal();
  }

  /* handleOrderInfoModal = () => {
    if (this.props.orderStatus.didOrderSave && this.props.cartData.cartDeleted) {
      const app = document.querySelector('#root');
      const modal = document.querySelector('div#order_status_cnt');

      app.style.opacity = "0.2";
      modal.style.opacity = "1";
      modal.style.color = "red";
    }
  } */

  resetOrderStatus = () => {
    this.props.deleteOrderStatus();
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
      this.props.setDelivery({
        delivery_method: '',
        name: `${this.props.cart.user.name} ${this.props.cart.user.surname}`,
        address: this.props.cart.user.address,
        postal_code: this.props.cart.user.postal_code,
        city: this.props.cart.user.city, 
        email: this.props.cart.user.email,
        phone: this.props.cart.user.phone,
        totalPrice: 0,
      });
    }

    const orderSummary = document.querySelector('.order_summary');
    orderSummary.classList.remove('summary_visible');
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
    if (this.props.auth.isAuthenticated) {
      const user = this.props.auth.user;
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

  renderProductList() {
    const cart = this.props.cart;
    if (cart) {
      if (cart.length !== 0 && cart.items && cart.items.length !== 0 && this.props.auth.isAuthenticated) {
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
    }

    return <p>W oczekiwaniu na produkty</p>;
  }

  renderOrderStatusInfo() {
    if (this.props.orderStatus.didOrderSave && this.props.cartData.cartDeleted) {
      return (
        <div id="order_status_cnt" className="order_status_cnt">
          <div className="order_status_info">
            <p>Twoje zamówienie zostało przesłane do realizacji</p>
            <button className="main_button" onClick={this.resetOrderStatus} type="button" aria-label="Zamknij okno">Zamknij okno</button>
          </div>
        </div>
      )
    }
  }

  renderDelivery() {
    if (this.props.cart) {
      if (this.props.cart.user) {
        return (
          <div className="cart_order">
            <Delivery />
            <Payment />
            <OrderSummary />
          </div>
        )
      }
    }
  }

  renderOrderOptionsButton() {
    if(this.props.cart) {
      if (this.props.auth.token !== null && this.props.cart.items) {
        if (this.props.cart.items.length > 0) {
          return (
            <div>
              <p className="price">Suma: {this.props.cartData.itemsPrice}zł</p>
              <button className="main_button goToOrder" onClick={this.onClickBuy} type="button" aria-label="Przejdź do opcji zamówienia">Przejdź do opcji zamówienia</button>      
            </div>
          )
        }
      }
    }
  }

  render() {
    return (
      <div className="container cart" data-active="inactive">
        {this.renderOrderStatusInfo()}
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
  setDelivery: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return { 
    auth: state.auth,
    cart: state.cartData.cart,
    cartData: state.cartData,
    orderStatus: state.orderStatus
  };
};

export default connect(mapStateToProps, { fetchCart, deleteProduct, changeProductQuantity, setDelivery, deleteOrderStatus })(Cart);
