/** @format */

const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

const validationChecks = [
  check('paymentType', 'Payment type is required').not().isEmpty(),
  check('paymentMethod', 'Payment method is required').not().isEmpty(),
  check('cancelled', 'cancelled is required').not().isEmpty(),
  check('time', 'Time is required').not().isEmpty(),
  check('date', 'Date is required').not().isEmpty(),
  check('currency', 'Currency is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('amount', 'Amount is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
];

const getUserTransactions = async (req, res) => {
  try {
    const transaction = await (
      await Transaction.findOne({ user: req.user.id })
    ).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res
        .status(400)
        .json({ msg: 'There is no transactions for this user' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createAndUpdateTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    paymentType,
    paymentMethod,
    cancelled,
    time,
    date,
    currency,
    category,
    amount,
    location,
    company,
  } = req.body;

  // Build Transaction Object

  const transactionFields = {};
  transactionFields.user = req.user.id;
  if (paymentType) transactionFields.paymentType = paymentType;
  if (paymentMethod) transactionFields.paymentMethod = paymentMethod;
  if (cancelled) transactionFields.cancelled = cancelled;
  if (time) transactionFields.time = time;
  if (date) transactionFields.date = date;
  if (currency) transactionFields.currency = currency;
  if (category) transactionFields.category = category;
  if (amount) transactionFields.transactionType = transactionType;
  if (location) transactionFields.location = location;
  if (company) transactionFields.company = company;

  try {
    let transaction = await Transaction.findOne({ user: req.user.id });
    if (transaction) {
      //Update
      transaction = await Transaction.findOneAndUpdate(
        { user: req.user.id },
        { $set: transactionFields },
        { new: true }
      );
      return res.json(transaction);
    }
    //Create
    transaction = new Transaction(transactionFields);
    await Transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', [
      'first_name',
      'last_name',
    ]);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getTransactionByUserId = async (req, res) => {
  try {
    const transaction = await (
      await Transaction.findOne({ user: req.params.user_id })
    ).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res.status(400).json({ msg: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Transaction not found' });
    }
    res.status(500).send('Server Error');
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndRemove({ _id: req._id });
    res.json({ msg: 'Transaction deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  validationChecks,
  getUserTransactions,
  createAndUpdateTransaction,
  getAllTransactions,
  getTransactionByUserId,
  deleteTransaction,
};
