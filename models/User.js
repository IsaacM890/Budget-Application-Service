/** @format */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
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
  currentBalance: {
    type: String,
    required: true,
  },
  currentBalanceCurrency: {
    type: String,
    required: true,
  },
  creditCard: [
    {
      expYear: { type: Number, required: true },
      expMonth: { type: Number, required: true },
      last4Digits: { type: Number, required: true },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
