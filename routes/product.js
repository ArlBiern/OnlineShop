const express = require('express');
const { Product } = require('../models/product');

const router = express.Router();

// Products list
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// get Product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('The product with the given ID was not found');

  return res.send(product);
});

module.exports = router;
