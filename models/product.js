const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 500,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  completion: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  weight: String,
  height: String,
  width: String,
  length: String,
  material: String,
  montage: String,
  color: String,
  category: String,
  media: String,
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(20).max(500).required(),
    price: Joi.number().required(),
    completion: Joi.string().required(),
    photo: Joi.string().required(),
    weight: Joi.string(),
    height: Joi.string(),
    width: Joi.string(),
    length: Joi.string(),
    material: Joi.string(),
    montage: Joi.string(),
    color: Joi.string(),
    category: Joi.string(),
    media: Joi.string(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
