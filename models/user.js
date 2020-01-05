require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Imię nie może być puste'],
    minlength: [2, 'Zbyt krótkie imię'],
    maxlength: [20, 'Zbyt długie imię'],
    trim: true,
    uppercase: true,
  },
  surname: {
    type: String,
    required: [true, 'Nazwisko nie może być puste'],
    minlength: [2, 'Zbyt krótkie nazwisko'],
    maxlength: [50, 'Zbyt długie nazwisko'],
    trim: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: [true, 'E-mail nie może być pusty'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Błędny adres e-mail',
    ],
    minlength: 6,
    maxlength: 60,
    lowercase: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Numer telefonu nie może być pusty'],
    minlength: 9,
    maxlength: 22,
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Adres nie może być pusty'],
    minlength: [3, 'Zbyt krótki adres'],
    maxlength: [120, 'Zbyt długi adres'],
    trim: true,
    uppercase: true,
  },
  postal_code: {
    type: String,
    required: [true, 'Kod pocztowy nie może być pusty'],
    match: [
      /^([0-9]{2})(-[0-9]{3})?$/,
      'Błędny kod pocztowy',
    ],
  },
  city: {
    type: String,
    required: [true, 'Miejscowość nie może być pusta'],
    minlength: [2, 'Zbyt krótka nazwa miejscowości'],
    maxlength: [50, 'Zbyt długa nazwa miejscowości'],
    trim: true,
    uppercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password field cannot be empty'],
    minlength: 8,
    maxlength: 500,
    trim: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JWT_PRIVATEKEY,
    {
      expiresIn: '1h',
    },
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUserRegistration(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(20)
      .required(),
    surname: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(6)
      .max(60)
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    phone: Joi.string()
      .min(9)
      .max(22)
      .required(),
    address: Joi.string()
      .min(3)
      .max(120)
      .required(),
    postal_code: Joi.string()
      .regex(/^([0-9]{2})(-[0-9]{3})?$/)
      .required(),
    city: Joi.string()
      .min(2)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/)
      .required(),
    repeat_password: Joi.ref('password'),
  }).with('password', 'repeat_password');

  return schema.validate(user, { abortEarly: false });
}

function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(60)
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/)
      .required(),
  });

  return schema.validate(user, { abortEarly: false });
}

exports.User = User;
exports.validateUserRegistration = validateUserRegistration;
exports.validateUserLogin = validateUserLogin;
