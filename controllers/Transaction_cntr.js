/** @format */

const Transaction = require('../models/Transaction');
const { validationResult } = require('express-validator');
const { serverMsg } = require('../constants/messages');
const logger = require('../utils/logger');

const createTransaction = async (req, res) => {
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

  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    if (transaction) {
      return res
        .status(400)
        .json({ errors: [{ msg: serverMsg.error.existsTrnsc }] });
    }

    transaction = new Transaction({
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
    });

    await transaction.save();

    return res.json({
      success: {
        msg: serverMsg.success.createTrnsc,
        data: transaction,
      },
    });
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: serverMsg.error.serverError }] });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res.status(400).json({ errors: { msg: serverMsg.error.noTrnsc } });
    }
    return res.json(transaction);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const updateTransaction = async (req, res) => {
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

  if (
    (paymentType,
    paymentMethod,
    cancelled,
    time,
    date,
    currency,
    category,
    amount,
    location,
    company)
  )
    transactionFields = transactionFields;

  const transactionFields = {};
  transactionFields.user = req.user.id;
  const fields = [
    'paymentType',
    'paymentMethod',
    'cancelled',
    'time',
    'date',
    'currency',
    'category',
    'amount',
    'location',
    'company',
  ];

  fields.forEach(
    (field) => req.body[field] && (transactionFields[field] = req.body[field])
  );

  try {
    const transaction = await Transaction.findOne({ user: req.user.id });
    if (transaction) {
      //Update
      transaction = await Transaction.findOneAndUpdate(
        { user: req.user.id },
        { $set: transactionFields },
        { new: true }
      );
      return res.json(transaction);
    }
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ errors: { msg: serverMsg.error.serverError } });
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
    logger.error(err.message);
    res.status(500).json({ success: { msg: serverMsg.error.serverError } });
  }
};

const getTransactionByUserId = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      user: req.params.user_id,
    }).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res.status(400).json({ msg: serverMsg.error.noFoundTrnsc });
    }
    res.json(transaction);
  } catch (err) {
    logger.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: serverMsg.error.noFoundTrnsc });
    }
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      return res.status(400).json({
        errors: { msg: serverMsg.error.noFoundTrnsc },
      });
    }
    return res.json({
      success: { msg: serverMsg.success.deleteTrnsc },
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

module.exports = {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  getAllTransactions,
  getTransactionByUserId,
  deleteTransaction,
};
