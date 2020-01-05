const express = require('express');
const bcrypt = require('bcryptjs');
const { User, validateUserLogin } = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Login new user
router.post('/', async (req, res) => {
  // Validate the input
  const { error } = validateUserLogin(req.body);
  if (error) {
    const errorArray = [];
    error.details.forEach(detail => errorArray.push(detail.message));
    return res.status(400).send(errorArray);
  }

  // Checking whether user is already registered
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: 'Nie jesteś zarejestrowanym użytkownikiem' });

  // Checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ msg: 'Nieprawidłowy e-mail lub hasło' });

  const token = user.generateAuthToken();

  const resUser = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    address: user.address,
    postal_code: user.postal_code,
    city: user.city,
  };

  return res.status(200).send({
    token,
    user: resUser,
  });
});

// Get login/user (check authorization/authentication)
router.get('/user', auth, (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
