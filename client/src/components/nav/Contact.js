import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from '../../actions/contactActions';
import '../../styles/Forms.css';

class Contact extends React.Component {
  state = { alertMsg: '' }

  componentDidUpdate(prevProps) {
    if (!(this.props.contact.length === prevProps.contact.length)) {
      const index = this.props.contact.length - 1;
      if (this.props.contact[index] === 1) {
        this.props.history.push('/');
      } else if (this.props.contact[index] === 2) {
        this.setState({ alertMsg: 'Nie udało się wysłać wiadomości, spróbuj ponownie' });
      }
    }
  }

  renderTextarea = ({ input, placeholder, meta }) => {
    return (
      <div>
        <textarea {...input} placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    );
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

  onSubmit = (formValues) => {
    this.props.sendEmail(formValues);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="error_container">
          <p>{error}</p>
        </div>
      );
    }
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
        <div>
          { this.state.alertMsg ? <p className="error_box">{this.state.alertMsg}</p> : null }
        </div>
      </div>
    );
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
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = 'Niepoprawny adres e-mail';
  }

  if (!formValues.message) {
    errors.message = 'Proszę wprowadź wiadomość';
  } else if (formValues.message.length < 5) {
    errors.message = 'Wiadomość powinna być dłuższa niż 5 znaków';
  } else if (formValues.message.length > 800) {
    errors.message = 'Temat powinien być krótszy niż 800 znaków';
  }

  return errors;
};

Contact.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.object.isRequired,
    PropTypes.func.isRequired,
  ])).isRequired,
  contact: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

const MapStateToProps = state => {
  return { contact: state.contact };
};

const formWrapped = reduxForm({
  form: 'contact',
  validate,
})(Contact);

export default connect(MapStateToProps, { sendEmail })(formWrapped);
