require('dotenv').config();
const express = require('express');
const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const home = require('./routes/home');

const app = express();

const connectionString = `mongodb://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.address')}/${config.get('db.name')}`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...')
}

/*
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
*/

app.use('/', home);

const port = process.env.PORT || 5000;

app.listen(port, () => basicDebug(`Listening on port ${port}`));
