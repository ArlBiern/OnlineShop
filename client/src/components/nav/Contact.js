import React from 'react';
import { Field, reduxForm } from 'redux-form';
import '../../styles/Forms.css';

class Contact extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="error_container">
          <p>{error}</p>
        </div>
      )
    }
  }

  renderInput = ({ input, placeholder, meta }) => {
    return (
      <div>
        {this.renderError(meta)}
        <input
          {...input}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
        />
      </div>
    );
  }

  renderTextarea = ({ input, placeholder, meta }) => {
    return (
      <div>
        <textarea {...input} placeholder={placeholder}></textarea>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <div className="container">
        <h1>Kontakt</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="user_form">
          <Field
            name="name"
            placeholder="Imię"
            component={this.renderInput}
          />
          <Field
            name="subject"
            placeholder="Temat"
            component={this.renderInput}
          />
          <Field
            name="phone"
            placeholder="Telefon"
            component={this.renderInput}
          />
          <Field
            name="email"
            placeholder="E-mail"
            component={this.renderInput}
          />
          <Field
            name="message"
            placeholder="Wiadomość"
            component={this.renderTextarea}
          />
          <div>
            <button type="submit" className="main_button">
              Wyślij wiadomość
            </button>
          </div>
        </form>
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

  if (!formValues.subject) {
    errors.subject = 'Proszę wprowadź temat';
  } else if (formValues.subject.length < 5) {
    errors.subject = 'Temat powinien być dłuższy niż 5 znaków';
  } else if (formValues.subject.length > 50) {
    errors.subject = 'Temat powinien być krótszy niż 50 liter';
  }

  if (!formValues.phone) {
    errors.phone = 'Proszę wprowadź numer telefonu';
  } else if (formValues.phone.length < 9) {
    errors.phone = 'Numer telefonu jest zbyt krótki';
  } else if (formValues.phone.length > 22) {
    errors.phone = 'Numer telefonu jest zbyt długi';
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

  if (!formValues.message) {
    errors.message = 'Proszę wprowadź wiadomość';
  } else if (formValues.message.length < 5) {
    errors.message = 'Wiadomość powinna być dłuższa niż 5 znaków';
  } else if (formValues.message.length > 800) {
    errors.message = 'Temat powinien być krótszy niż 800 znaków';
  }

  return errors;
}

export default reduxForm({
  form: 'contact',
  validate
})(Contact);