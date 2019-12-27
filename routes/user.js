const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { User, validateUser } = require('../models/user');

// Register new user
router.post('/', async (req, res) => {
  // Validate the input
  const { error } = validateUser(req.body);
  if (error) {
    const errorArray = [];
    error.details.forEach(detail => errorArray.push(detail.message));
    return res.status(400).send(errorArray);
  }
  // Checking whether user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Jesteś już zarejestrowany na naszej stronie');

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Saving an user
  user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    postal_code: req.body.postal_code,
    city: req.body.city,
    password: hashedPassword
  });

  await user.save();

  res.status(200).send(user);
});

module.exports = router;
