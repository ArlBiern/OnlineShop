const express = require('express');
const { Cart, validateCart } = require('../models/cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Get cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({ path: 'user', select: 'name surname address postal_code city phone email' }).populate({ path: 'items.product', select: 'name price orderOptions' });
  if (!cart) return res.status(404).json({ msg: 'Szukany koszyk nie istnieje' });

  // Calculating delivery price and items price
  let allItems = cart.items;
  let itemsPrice = 0;

  const deliveryPrices = {
    'Kurier': 0,
    'Dostawa Warszawa': 0, 
    'Paczkomat Inpost': 0
  }

  const sumDeliveryPrice = (type, possible, priceOptions, quantity) => {
    if (possible) {
      for (let i = 0; i < priceOptions.length; i++) {
        if (quantity <= priceOptions[i].packageCount) {
          deliveryPrices[type] += priceOptions[i].totalCost;
          break;
        }
      }
    };
  } 

  allItems.forEach(item => {
    itemsPrice += (item.quantity * item.product.price);

    item.product.orderOptions.forEach(option => {
      if (option.type === "Dostawa Warszawa") {
        deliveryPrices[option.type] = 15;
      } else {
        sumDeliveryPrice(option.type, option.possible, option.price, item.quantity);
      }
    });
  });

  return res.status(200).send({
    cart: cart, 
    deliveryPrices: deliveryPrices,
    itemsPrice: itemsPrice
  });
});

// Create cart
router.post('/', auth, async (req, res) => {
  // request validation
  const { error } = validateCart(req.body);
  if (error) {
    const errorArray = [];
    error.details.forEach(detail => errorArray.push(detail.message));
    return res.status(400).send(errorArray);
  }

  const newItem = {
    product: req.body.product,
    quantity: req.body.quantity || 1,
  };

  let cart = await Cart.findOne({ user: req.user._id });

  // Case cart is already created
  if (cart) {
    const oldProducts = cart.items.map(item => item.product);

    // Check whether product is already in the cart
    if (oldProducts.includes(newItem.product)) {
      cart = await Cart.findOneAndUpdate({
        user: req.user._id,
        items: {
          $elemMatch: { product: newItem.product },
        },
      },
      {
        $inc: { 'items.$.quantity': newItem.quantity },
      },
      {
        new: true,
      });

      return res.status(200).send(cart);
    }

    // Product is not in the cart
    cart.items.push(newItem);
    await cart.save();

    return res.status(200).send(cart);
  }

  // Case cart is not created yet
  cart = new Cart({
    user: req.user._id,
    items: [newItem],
  });

  await cart.save();

  return res.status(200).send(cart);
});

router.delete('/:id', async (req, res) => {
  //let cart = await Cart.findOne({ "cart._id": req.body.id})
  console.log(req.params.id);
})

// Increase and decrease quantity
router.put('/quantity', auth, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(400).json({ msg: 'Nieprawnie wprowadzone dane, spróbuj jeszcze raz' });

  const quantity = req.body.quantity > 10 ? 10 : req.body.quantity;

  // updating product quantity
  cart = await Cart.findOneAndUpdate({
    user: req.user._id,
    items: {
      $elemMatch: { product: req.body.product },
    },
  },
  {
    'items.$.quantity': quantity,
  },
  {
    new: true,
  });

  return res.status(200).send(cart);
});

// delete product from the cart
router.delete('/product/:id', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(400).json({ msg: 'Niepoprawnie wprowadzone dane, spróbuj jeszcze raz' });

  const itemMatch = cart.items.filter((item) => item.product == req.params.id);

  if (itemMatch.length === 0) {
    return res.status(200).send(cart);
  }

  const itemID = itemMatch[0]['_id'];
  await cart.items.id(itemID).remove();
  await cart.save();

  return res.status(200).send(cart);
});

module.exports = router;
