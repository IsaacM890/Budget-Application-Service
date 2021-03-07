/** @format */

const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  exp_year: { type: Number, required: true },
  exp_month: { type: Number, required: true },
  last4Digits: { type: Number, required: true },
});

module.exports = CreditCard = mongoose.model('creditCard', CreditCardSchema);
