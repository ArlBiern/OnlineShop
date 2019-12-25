require('dotenv').config();
const express = require('express');
const home = require('./routes/home');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const config = require('config');

const app = express();

/*
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
*/

app.use('/', home);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
