import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import '../../styles/Forms.css';

class Registration extends React.Component {
  state = { alertMsg: null}

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="error_container">
          <p>{error}</p>
        </div>
      )
    }
  }

  renderInput = ({ input, placeholder, type, meta }) => {
    return (
      <div className="input_field">
        {this.renderError(meta)}
        <input 
          {...input} 
          placeholder={placeholder} 
          type={type}
          autoComplete="off"
        />
      </div>
    )
  }
 
  onSubmit = formValues => {
    this.props.registerUser(formValues);
  }

  componentDidUpdate(prevProps) {
    const { appErrors, didRegister } = this.props;
    
    if (appErrors !== prevProps.appErrors) {
      if (appErrors.id === 'REGISTER_FAIL') {
        this.setState({alertMsg: appErrors.msg})
      }
    } 

    if (didRegister) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Rejestarcja</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="user_form">
          <div>
            <Field
              name="name"
              type="text"
              placeholder="Imię"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="surname"
              type="text"
              placeholder="Nazwisko"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="email"
              type="text"
              placeholder="E-mail"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="phone"
              type="text"
              placeholder="Telefon"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="address"
              type="text"
              placeholder="Ulica oraz numer domu"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="postal_code"
              type="text"
              placeholder="__-___"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="city"
              type="text"
              placeholder="Miejscowość"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              placeholder="Hasło"
              component={this.renderInput}
            />
          </div>
          <div>
            <Field
              name="repeat_password"
              type="password"
              placeholder="Powtórz hasło"
              component={this.renderInput}
            />
          </div>
          <div>
            <button type="submit" className="main_button">
              Zarejestruj
            </button>
          </div>
        </form>
        <div>
          { this.state.alertMsg ? <p>{this.state.alertMsg}</p> : null }
        </div>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {};
  
  if (!formValues.name) {
    errors.name = 'Proszę wprowadź swoje imię';
  } else if (formValues.name.length < 2) {
    errors.name = 'Imię powinno być dłuższe niż 2 litery';
  } else if (formValues.name.length > 20) {
    errors.name = 'Imię powinno być krótsze niż 20 liter';
  }

  if (!formValues.surname) {
    errors.surname = 'Proszę wprowadź swoje nazwisko';
  } else if (formValues.surname.length < 2) {
    errors.surname = 'Nazwisko powinno być dłuższe niż 2 litery';
  } else if (formValues.surname.length > 50) {
    errors.surname = 'Nazwisko powinno być krótsze niż 50 liter';
  }

  if (!formValues.email) {
    errors.email = 'Proszę wprowadź swój e-mail';
  } else if (formValues.email.length < 6) {
    errors.email = 'E-mail powinien być dłuższy niż 6 znaków';
  } else if (formValues.email.length > 60) {
    errors.email = 'E-mail powinien być krótszy niż 60 znaków';
  } else if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = 'Niepoprawny adres e-mail'
  }

  if (!formValues.phone) {
    errors.phone = 'Proszę wprowadź numer telefonu';
  } else if (formValues.phone.length < 9) {
    errors.phone = 'Numer telefonu jest zbyt krótki';
  } else if (formValues.phone.length > 22) {
    errors.phone = 'Numer telefonu jest zbyt długi';
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
    errors.postal_code = 'Niepoprawny kod pocztowy'
  }

  if (!formValues.city) {
    errors.city = 'Proszę wprowadź nazwę miejscowości';
  } else if (formValues.city.length < 2) {
    errors.city = 'Zbyt krótka nazwa miejscowości';
  } else if (formValues.city.length > 50) {
    errors.city = 'Zbyt długa nazwa miejscowości';
  }

  if (!formValues.password) {
    errors.password = 'Proszę wprowadź hasło';
  } else if (formValues.password.length < 8) {
    errors.password = 'Hasło powinno być dłuższe niż 8 znaków';
  } else if (formValues.password.length > 30) {
    errors.password = 'Hasło powinno być krótsze niż 30 znaków';
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(formValues.password)) {
    errors.password = 'Hasło powinno mieć conajmniej jedną cyfrę, dużą literę oraz znak specjalny';
  }

  if (!formValues.repeat_password) {
    errors.repeat_password = 'Proszę powtórz hasło';
  } else if (formValues.repeat_password !== formValues.password) {
    errors.repeat_password = 'Brak zgodości haseł';
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    didRegister: state.auth.didRegister,
    appErrors: state.error
  }
};

const formWrapped = reduxForm({
  form: 'userRegistration',
  validate
})(Registration);

export default connect(mapStateToProps, { registerUser })(formWrapped);
