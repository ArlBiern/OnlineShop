const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        min: 1,
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

function validateCart(cart) {
  const schema = Joi.object({
    user: Joi.string(),
    product: Joi.string().required(), 
    quantity: Joi.number()
  });

  return schema.validate(cart);
};

exports.Cart = Cart;
exports.validateCart = validateCart;
