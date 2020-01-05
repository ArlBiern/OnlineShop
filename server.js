require('dotenv').config();
require('express-async-errors');
const winston = require('winston');
const express = require('express');
const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');
const path = require('path');

const app = express();

const user = require('./routes/user');
const login = require('./routes/login');
const products = require('./routes/product');
const cart = require('./routes/cart');
const contact = require('./routes/contact');
const error = require('./middleware/error');

// Basic handling exceptions and promise rejections
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
});

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({
  filename: 'logfile.log',
  handleExceptions: true,
}));

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE_ADDRESS}/${process.env.DB_DATABASE_NAME}`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...');
}

// Seed products in databease
// const seedProducts = require('./seeds/products');
// seedProducts();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/registration', user);
app.use('/login', login);
app.use('/login/user', login);
app.use('/products', products);
app.use('/cart', cart);
app.use('/contact', contact);

app.use(error);

// Serve static assets (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  }); 
}

const port = process.env.PORT || 5000;

app.listen(port, () => basicDebug(`Listening on port ${port}`));
