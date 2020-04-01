const express = require('express');
const { Order, validateOrder } = require('../models/order');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all orders
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ "cart.user": req.user._id });
  if (!orders) return res.status(404).json({ msg: 'Wystąpił błąd, spróbuj odświeżyć stronę.' });

  res.send(orders);
});

// Save order
router.post('/', auth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) {
    const errorArray = [];
    error.details.forEach(detail => errorArray.push(detail.message));
    return res.status(400).json({msg: 'Wystąpił błąd w przesłaniu zamówienia, skontaktuj się z nami lub spróbuj ponownie.'});
  }

  let order = new Order({
    cart: {
      items: req.body.cart.items,
      itemsPrice: req.body.cart.itemsPrice,
    },
    deliveryData: {
      delivery_method: req.body.deliveryData.delivery_method, 
      name: req.body.deliveryData.name, 
      address: req.body.deliveryData.address, 
      postal_code: req.body.deliveryData.postal_code, 
      city: req.body.deliveryData.city,
      email: req.body.deliveryData.email,  
      phone: req.body.deliveryData.phone,  
    }, 
    paymentMethod: req.body.paymentMethod,  
    totalPrice: req.body.totalPrice,  
  });

  await order.save();

  return res.status(200).send(order);
});

module.exports = router;
