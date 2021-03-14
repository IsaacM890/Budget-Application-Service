/** @format */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
    required: true,
  },
  current_balance: {
    type: String,
    required: true,
  },
  current_balance_currency: {
    type: String,
    required: true,
  },
  credit_cards: [
    {
      exp_year: { type: Number, required: true },
      exp_month: { type: Number, required: true },
      last4Digits: { type: Number, required: true },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
