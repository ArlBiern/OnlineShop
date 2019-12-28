import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

/*
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}
*/
class Login extends React.Component {

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
    /* let result = this.props.loginUser(formValues);
    result
      .then(() => {
        if (!true) {
          throw new SubmissionError({
            email: 'User does not exist'
          }) 
        } else if (true) {
          throw new SubmissionError({
            password: 'Wrong password'
        })}
      })
      .catch(err => console.log(err)); */

    /* return this.props.loginUser(formValues)
      .then(payload => console.log(payload))
      .catch( error => console.log(error)); */
    this.props.loginUser(formValues);
  }

  render() {
    return (
      <div className="form_container">
        <h2>Logowanie</h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="registration_form">
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
            <button type="submit">
              Submit
            </button>
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

const formWrapped = reduxForm({
  form: 'userLogin',
  validate
})(Login);

export default connect(null, { loginUser })(formWrapped);
