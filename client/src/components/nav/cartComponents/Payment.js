import React from 'react';

class Payment extends React.Component {
  render () {
    return (
      <div className="order_payment">
        <h3>Metoda płatności</h3> 
        <p>Płatności należy dokonać poprzez wpłacenie łącznej kowtu zakupu oraz dostawy na konto:</p>
        <p className="account_number"> 23 1234 5678 0000 0000 0020 2345</p>
        <p>Realizacja zamówienia zostanie rozpoczęta po otrzymaniu przelewu.</p>
      </div>
    )
  }
}

export default Payment;