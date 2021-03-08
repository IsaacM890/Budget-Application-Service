/** @format */

const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  transactionType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  currency: {
    type: String,
  },
  category: {
    type: String,
  },
  amount: {
    from: { type: Number, required: true },
    to: { type: Number },
  },
  location: {
    city: { type: String },
    country: { type: String },
  },
  company: { type: String },
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
