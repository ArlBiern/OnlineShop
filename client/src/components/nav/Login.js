import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import '../../styles/Forms.css';

class Login extends React.Component {
  state = { alertMsg: null }

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
    this.props.loginUser(formValues);
  }

  componentDidUpdate(prevProps) {
    const { appErrors, isAuthenticated } = this.props;

    if (appErrors !== prevProps.appErrors) {
      if (appErrors.id === 'LOGIN_FAIL') {
        this.setState({ alertMsg: appErrors.msg.msg })
      }
    }

    if (isAuthenticated !== prevProps.isAuthenticated) {
      if (isAuthenticated) {
        this.props.history.push('/') 
      }
    }
  }
  
  render() {
    return (
      <div className="container">
        <h1>Logowanie</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="user_form">
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
              name="password"
              type="password"
              placeholder="Hasło"
              component={this.renderInput}
            />
          </div>
          <div>
            <button type="submit" className="main_button">
              Zaloguj
            </button>
          </div>
          <div>
            { this.state.alertMsg ? <p className="error_box">{this.state.alertMsg}</p> : null }
          </div>
        </form>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Proszę wprowadź swój e-mail';
  } else if (formValues.email.length < 6) {
    errors.email = 'E-mail powinien być dłuższy niż 6 znaków';
  } else if (formValues.email.length > 60) {
    errors.email = 'E-mail powinien być krótszy niż 60 znaków';
  } else if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = 'Niepoprawny adres e-mail'
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

  return errors
}

const mapStateToProps = state => {
  return {
    appErrors: state.error,
    isAuthenticated: state.auth.isAuthenticated
  }
};

const formWrapped = reduxForm({
  form: 'userLogin',
  validate
})(Login);

export default connect(mapStateToProps, { loginUser })(formWrapped);
