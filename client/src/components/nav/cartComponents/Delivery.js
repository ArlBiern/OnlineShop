import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchCart } from '../../../actions/cartActions';
import { setDelivery } from '../../../actions/deliveryActions';

class Delivery extends React.Component {
  state = { 
    inpostAddress: {
      chosen: false,
      address: '',
      postal_code: '',
      city: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.displayPossibleDelivery();
    }
  }
 
  componentDidMount() {
    this.props.setDelivery({
        delivery_method: '',
        name: `${this.props.user.name} ${this.props.user.surname}`,
        address: this.props.user.address,
        postal_code: this.props.user.postal_code,
        city: this.props.user.city, 
        email: this.props.user.email,
        phone: this.props.user.phone,
        totalPrice: 0,
      }
    );

    this.inpostRadioSelection();
    this.inpostMapSelection();
  };

  // Save to props address of chosen "paczkomat"
  inpostMapSelection() {
    const inpost = document.querySelector('#easypack-map');

    inpost.addEventListener('click', (e) => {
      if (e.target.classList.contains('select-link')) {
        e.target.style.backgroundColor = "green";
        const popup = inpost.querySelector('p.address');
        let length = popup.childNodes[2].nodeValue.trim().length;

        let address = popup.childNodes[0].nodeValue.trim();
        let postal_code = popup.childNodes[2].nodeValue.trim().substring(0, 6);
        let city = popup.childNodes[2].nodeValue.trim().substring(7, length);
        
        this.setState({
          inpostAddress: {
            chosen: true,
            address: address,
            postal_code: postal_code,
            city: city
          }
        })
      };
    })
  }

  // Change visibility of fields depeneding on radio selection
  inpostRadioSelection() {
    const inpostRadio = document.querySelectorAll('.delivery_radio label');
    const deliveryInputFields = document.querySelector('.delivery_address');
    const inpostContainer = document.querySelector('.inpost_container');

    [...inpostRadio].forEach(el => el.addEventListener('click', (e) => {
      if (e.target.value === "Paczkomat Inpost") {
        deliveryInputFields.style.display = "none"
        inpostContainer.style.display = "flex";
      } else {
        deliveryInputFields.style.display = "inherit"
        inpostContainer.style.display = "none";
      }
    }))
  }

  // Input render for redux-form
  renderInput = ({ input, placeholder, type, meta, disabled }) => {
    return (
      <div className="input_field">
        {this.renderError(meta)}
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          disabled={disabled}
        />
      </div>
    );
  };

  // Render delivery options radio fields and do the price calculation
  renderRadioInput() {
    let allItems = this.props.cart.items;
    const deliveryOptions = {
      'Kurier': true,
      'Dostawa Warszawa': true, 
      'Paczkomat Inpost': true
    }
    let notPossible = [];

    allItems.forEach(item => {
      item.product.orderOptions.forEach(option => {
        if (option.possible === false ) {
          notPossible.push({product: item.product.name, type: option.type});
          deliveryOptions[`${option.type}`] = false;
        }
      });
    });

    return (
      <div className="delivery_radio">
        <label>
          <Field
            name="delivery_method" 
            component={this.renderInput} 
            type="radio" 
            value="Kurier"
            disabled={!deliveryOptions['Kurier']}/>
            <div className="deliveryDescription">
              <span>Dostawa kurierem</span> 
              <span className="deliveryPrice">{this.props.deliveryPrices['Kurier'].toFixed(2)} zł</span>
            </div>  
        </label>
        <label>
          <Field 
            name="delivery_method" 
            component={this.renderInput} 
            type="radio" 
            value="Dostawa Warszawa"
            disabled={!deliveryOptions['Dostawa Warszawa']}/> 
            <div className="deliveryDescription">
              <span>Dostawa Warszawa</span>
              <span className="deliveryPrice">15.00 zł</span>
            </div>
        </label>
        <label>
          <Field 
            name="delivery_method" 
            component={this.renderInput}
            type="radio" 
            value="Paczkomat Inpost"
            disabled={!deliveryOptions['Paczkomat Inpost']}/>
            <div className="deliveryDescription">
              <span>Paczkomat inpost</span> 
              <span className="deliveryPrice">{this.props.deliveryPrices['Paczkomat Inpost'].toFixed(2)} zł</span>
            </div>
        </label>
      </div>
    )
  } 
  
  // Displaying only possible option of delivery  
  displayPossibleDelivery() {
    const radios = document.querySelector('.delivery_radio');
    const disabledInputs = radios.querySelectorAll('input[disabled]');

    [...disabledInputs].forEach( input => input.parentElement.parentElement.style.display = "none");
  } 

  // Rendering error of redux-form
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="error_container">
          <p>{error}</p>
        </div>
      );
    }
  }

  // Submiting chosen delivery options
  onSubmit = formValues => {
    if (formValues.delivery_method === 'Paczkomat Inpost') {
      if (this.state.inpostAddress.chosen === false) {
        alert("Wybierz proszę adres paczkomatu")
      } else {
        this.props.setDelivery({
          delivery_method: formValues.delivery_method,
          name: formValues.name,
          address: this.state.inpostAddress.address,
          postal_code: this.state.inpostAddress.postal_code,
          city: this.state.inpostAddress.city, 
          email: formValues.email,
          phone: formValues.phone,
          totalPrice: (this.props.deliveryPrices[formValues.delivery_method] + this.props.itemsPrice),
        });
      }
    } else if (formValues.delivery_method === 'Dostawa Warszawa' && formValues.city.toUpperCase() !== 'WARSZAWA' ) {
      alert('Ta opcja dostawy jest możliwa tylko w Warszawie')
    } else {
      this.props.setDelivery({
        delivery_method: formValues.delivery_method,
        name: formValues.name,
        address: formValues.address,
        postal_code: formValues.postal_code,
        city: formValues.city, 
        email: formValues.email,
        phone: formValues.phone,
        totalPrice: (this.props.deliveryPrices[formValues.delivery_method] + this.props.itemsPrice)
      });
    }

    const orderSummary = document.querySelector('.order_summary');
    orderSummary.classList.add('summary_visible');
  }

  render () {
    return (
      <div className="order_address">
        <h3>Adres dostawy</h3> 
        <h5>Wybierz jedną z dostępnych opcji, wpisz adres lub wybierz paczkomat. Zweryfikuj wprowadzone dane w podsumowaniu.</h5>
        <p>W przypadku zamówienia różnych produktów zachęcamy do kontaktu bezpośredniego w celu indywidualnej wyceny dostawy.</p>
        <div className="order_address_details">
          <div className="courier_container">
            <form 
              onSubmit={this.props.handleSubmit(this.onSubmit)} 
              className="user_form"
              >
              <div>Sposób i dane dostawy</div> 
              {this.renderRadioInput()}
              <div className="inpost_container">
                <div id="easypack-map"></div>
                <h5>Po wybraniu paczkomatu zatwierdź wybór</h5>
              </div>
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder={`${this.props.user.name} ${this.props.user.surname}`}
                  component={this.renderInput}
                />
              </div>
              <div className="delivery_address">
                <div>
                  <Field
                    name="address"
                    type="text"
                    placeholder={this.props.user.address}
                    component={this.renderInput}
                  />
                </div>
                <div>
                  <Field
                    name="postal_code"
                    type="text"
                    placeholder={this.props.user.postal_code}
                    component={this.renderInput}
                  />
                </div>
                <div>
                  <Field
                    name="city"
                    type="text"
                    placeholder={this.props.user.city}
                    component={this.renderInput}
                  />
                </div>
              </div>
              <div>
                <Field
                  name="phone"
                  type="text"
                  placeholder={this.props.user.phone}
                  component={this.renderInput}
                />
              </div>
              <div>
                <Field
                  name="email"
                  type="text"
                  placeholder={this.props.user.email}
                  component={this.renderInput}
                />
              </div>
              <div>
                <button type="submit" className="main_button">
                  Zatwierdź wybór dostawy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {};
  if(!formValues.delivery_method) {
    errors.name = "Proszę wybrać jedną z powyższych opcji dostawy"
  }

  if (!formValues.name) {
    errors.name = 'Proszę wprowadź swoje imię oraz nazwisko';
  } else if (formValues.name.length < 2) {
    errors.name = 'Dane powinno być dłuższe niż 4 znaki';
  } else if (formValues.name.length > 70) {
    errors.name = 'Dane powinny być krótsze niż 70 znaków';
  }

  if (!formValues.address) {
    errors.address = 'Proszę wprowadź ulicę oraz numer domu';
  } else if (formValues.address.length < 3) {
    errors.address = 'Zbyt krótki adres';
  } else if (formValues.address.length > 120) {
    errors.address = 'Zbyt długi adres';
  }

  if (!formValues.postal_code) {
    errors.postal_code = 'Proszę wprowadź kod pocztowy';
  } else if (!/^([0-9]{2})(-[0-9]{3})?$/.test(formValues.postal_code)) {
    errors.postal_code = 'Niepoprawny kod pocztowy';
  }

  if (!formValues.city) {
    errors.city = 'Proszę wprowadź nazwę miejscowości';
  } else if (formValues.city.length < 2) {
    errors.city = 'Zbyt krótka nazwa miejscowości';
  } else if (formValues.city.length > 50) {
    errors.city = 'Zbyt długa nazwa miejscowości';
  }

  if (!formValues.email) {
    errors.email = 'Proszę wprowadź swój e-mail';
  } else if (formValues.email.length < 6) {
    errors.email = 'E-mail powinien być dłuższy niż 6 znaków';
  } else if (formValues.email.length > 60) {
    errors.email = 'E-mail powinien być krótszy niż 60 znaków';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = 'Niepoprawny adres e-mail';
  }

  if (!formValues.phone) {
    errors.phone = 'Proszę wprowadź numer telefonu';
  } else if (formValues.phone.length < 9) {
    errors.phone = 'Numer telefonu jest zbyt krótki';
  } else if (formValues.phone.length > 22) {
    errors.phone = 'Numer telefonu jest zbyt długi';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    user: state.cartData.cart.user,
    cart: state.cartData.cart,
    itemsPrice: state.cartData.itemsPrice,
    deliveryPrices: state.cartData.deliveryPrices,
    initialValues: {
      name: `${state.cartData.cart.user.name} ${state.cartData.cart.user.surname}`, 
      address: state.cartData.cart.user.address,
      postal_code: state.cartData.cart.user.postal_code,
      city: state.cartData.cart.user.city,
      email: state.cartData.cart.user.email,
      phone: state.cartData.cart.user.phone 
    }
  };
};

const formWrapped = reduxForm({
  form: 'deliveryForm',
  // enableReinitialize : true,
  validate,
})(Delivery);

export default connect(mapStateToProps, { fetchCart, setDelivery })(formWrapped);
