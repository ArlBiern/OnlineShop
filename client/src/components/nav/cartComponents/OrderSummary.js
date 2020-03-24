import React from 'react';
import { connect } from 'react-redux';

class OrderSummary extends React.Component {

  onClick() {
    console.log("Zamówiłeś produkty")
  }

  render() {
    return (
      <div className="order_summary">
        <h3>Podsumowanie</h3>
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
                <td>{this.props.totalPrice.toFixed(2)} zł</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="summary_orderButton">
          <button className="main_button" onClick={this.onClickBuy} type="button" aria-label="Przejdź do zamówienia">Zamawiam</button>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deliveryData: state.order.deliveryData,
    totalPrice: state.order.totalPrice,
  }
}

export default connect(mapStateToProps)(OrderSummary);
