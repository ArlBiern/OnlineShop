const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

//Books list
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
})

module.exports = router;