/** @format */

const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  exp_year: { type: Number, required: true },
  exp_month: { type: Number, required: true },
  last4Digits: { type: Number, required: true },
});

module.exports = Transaction = mongoose.model('creditcard', CreditCardSchema);
