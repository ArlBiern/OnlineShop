const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { User, validateUserLogin } = require('../models/user');
const auth = require('../middleware/auth');

// Register new user
router.post('/', async (req, res) => {
  // Validate the input
  const { error } = validateUserLogin(req.body);
  if (error) {
    const errorArray = [];
    error.details.forEach(detail => errorArray.push(detail.message));
    return res.status(400).send(errorArray);
  }
  // Checking whether user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: '400, nie mamy Cię w bazie'});

  // Checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ msg: 'Invalid email or password' });

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send({
    name: user.name
  });
  /* res.status(200).send({
    email: user.email,
    password: user.password
  }); */
});

// Get login/user
router.get('/user', auth, (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then(user => res.json(user));
});



module.exports = router;
