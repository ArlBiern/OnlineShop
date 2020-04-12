import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveOrder } from '../../../actions/orderActions';
import { deleteCart } from '../../../actions/cartActions';

class OrderSummary extends React.Component {
  state = { alertMsg: null }

  componentDidUpdate(prevProps) {
    if (this.props.appErrors !== prevProps.appErrors) {
      if (this.props.appErrors.id === 'ORDER_SAVE_FAIL') {
        this.setState({ alertMsg: this.props.appErrors.msg.msg });
      }
      if (this.props.appErrors.id === 'DELETE_CART_ERROR') {
        this.setState({ alertMsg: 'Nie udało sie usunać koszyka, jednak zamówienie zostało przesłane do realizacji' });
      }
    }
  }

  onClickBuy = () => {
    let products = [];

    this.props.cartData.cart.items.forEach( item => {
      products.push({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price, 
        quantity: item.quantity,
      })
    });

    this.props.saveOrder(
      {
        cart: {
          items: products,
          itemsPrice: this.props.cartData.itemsPrice,
        }, 
        deliveryData: {
          delivery_method: this.props.deliveryData.delivery_method, 
          name: this.props.deliveryData.name, 
          address: this.props.deliveryData.address, 
          postal_code: this.props.deliveryData.postal_code, 
          city: this.props.deliveryData.city,
          email: this.props.deliveryData.email,  
          phone: this.props.deliveryData.phone,  
        }, 
        paymentMethod: this.props.delivery.paymentMethod,  
        totalPrice: this.props.delivery.totalPrice, 
      },
      this.props.cartData.cart._id
      //'1234qeqwewqrq'
    );
  }

  render() {
    return (
      <div className="order_summary">
        <h3>Podsumowanie</h3>
        <div className="summary_cnt">
          <div className="summary_delivery">
            <table>
              <tbody>
                <tr>
                  <td>Sposób dostawy:</td>
                  <td>{this.props.deliveryData.delivery_method}</td>
                </tr>
                <tr>
                  <td>Osoba kontaktowa:</td>
                  <td>{this.props.deliveryData.name}</td>
                </tr>
                <tr>
                  <td>Ulica i nr:</td>
                  <td>{this.props.deliveryData.address}</td>
                </tr>
                <tr>
                  <td>Kod pocztowy: </td>
                  <td>{this.props.deliveryData.postal_code}</td>
                </tr>
                <tr>
                  <td>Miejscowość:</td>
                  <td>{this.props.deliveryData.city}</td>
                </tr>
                <tr>
                  <td>E-mail:</td>
                  <td>{this.props.deliveryData.email}</td>
                </tr>
                <tr>
                  <td>Telefon kontaktowy:</td>
                  <td>{this.props.deliveryData.phone}</td>
                </tr>
                <tr>
                  <td>Całkowity koszt:</td>
                  <td>{this.props.delivery.totalPrice.toFixed(2)} zł</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="summary_orderButton">
            <button className="main_button" onClick={this.onClickBuy} type="button" aria-label="Zamawiam">Zamawiam</button>
          </div> 
        </div>
        <div>
          { this.state.alertMsg ? <p className="error_box">{this.state.alertMsg}</p> : null }
        </div>
      </div>
    )
  }
}

OrderSummary.propTypes = {
  saveOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    deliveryData: state.delivery.deliveryData,
    delivery: state.delivery,
    cartData: state.cartData,
    appErrors: state.error,
  }
}

export default connect(mapStateToProps, { saveOrder, deleteCart })(OrderSummary);
