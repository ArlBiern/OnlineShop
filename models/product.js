const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 300,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  completion: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  weight: String,
  height: String,
  width: String,
  length: String,  
  material: String,
  montage: String,
  color: String,
  category: String  
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(20).max(300).required(),
    price: Joi.number().required(),
    completion: Joi.string().required(),
    photo: Joi.string().required()
  });

  return schema.validate(product);
};

exports.Product = Product;
exports.validateProduct = validateProduct;