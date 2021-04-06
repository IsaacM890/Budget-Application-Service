/** @format */

const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  paymentType: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  cancelled: {
    type: Boolean,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: { type: String },
  amount: {
    from: { type: Number, required: true },
    to: { type: Number },
  },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: String },
    lng: { type: String },
  },
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
