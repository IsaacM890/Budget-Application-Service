/** @format */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  current_balance: {
    type: String,
  },
  current_balance_currency: {
    type: String,
  },
  credit_card: [
    {
      exp_year: { type: Number, required: true },
      exp_month: { type: Number, required: true },
      last4Digits: { type: Number, required: true },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
