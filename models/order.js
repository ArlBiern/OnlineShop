const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const orderSchema = new mongoose.Schema({ 
  cart: {
    items: {
      type: Array, 
      required: true, 
    },
    itemsPrice: {
      type: Number, 
      required: true,
    }
  },
  deliveryData: {
    delivery_method: {
      type: String, 
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Imię i nazwisko nie może być puste'],
      minlength: [2, 'Zbyt krótkie dane'],
      maxlength: [70, 'Zbyt długie dane'],
      trim: true,
      uppercase: true,
    },
    address: {
      type: String,
      required: [true, 'Adres nie może być pusty'],
      minlength: [3, 'Zbyt krótki adres'],
      maxlength: [120, 'Zbyt długi adres'],
      trim: true,
      uppercase: true,
    },
    postal_code: {
      type: String,
      required: [true, 'Kod pocztowy nie może być pusty'],
      match: [
        /^([0-9]{2})(-[0-9]{3})?$/,
        'Błędny kod pocztowy',
      ],
    },
    city: {
      type: String,
      required: [true, 'Miejscowość nie może być pusta'],
      minlength: [2, 'Zbyt krótka nazwa miejscowości'],
      maxlength: [50, 'Zbyt długa nazwa miejscowości'],
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, 'E-mail nie może być pusty'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Błędny adres e-mail',
      ],
      minlength: 6,
      maxlength: 60,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Numer telefonu nie może być pusty'],
      minlength: 9,
      maxlength: 22,
      trim: true,
    },
  },
  paymentMethod: {
    type: String, 
    required: [true, 'Brak wybranej metody płatności'],
  }, 
  totalPrice: {
    type: Number, 
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    cart: Joi.object({
      items: Joi.array().required(), 
      itemsPrice: Joi.number().required(),
    }),
    deliveryData: Joi.object({
      delivery_method: Joi.string(),
      name: Joi.string()
        .min(2)
        .max(70)
        .required(),
      address: Joi.string()
        .min(3)
        .max(120)
        .required(),
      postal_code: Joi.string()
        .regex(/^([0-9]{2})(-[0-9]{3})?$/)
        .required(),
      city: Joi.string()
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .min(6)
        .max(60)
        .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      phone: Joi.string()
        .min(9)
        .max(22)
        .required(),
    }),
    paymentMethod: Joi.string().required(),
    totalPrice: Joi.number().required()
  })

  return schema.validate(order);
};


exports.Order = Order;
exports.validateOrder = validateOrder;
