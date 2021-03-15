/** @format */

const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const constants = require('../constants/index');
const utils = require('../utils/index');

const validationChecks = [
  check('paymentType', utils.getRequireText('payment Type')).not().isEmpty(),
  check('paymentMethod', utils.getRequireText('payment Method'))
    .not()
    .isEmpty(),
  check('cancelled', utils.getRequireText('Cancelled')).not().isEmpty(),
  check('time', utils.getRequireText('Time')).not().isEmpty(),
  check('date', utils.getRequireText('Date')).not().isEmpty(),
  check('currency', utils.getRequireText('Currency')).not().isEmpty(),
  check('category', utils.getRequireText('Category')).not().isEmpty(),
  check('amount', utils.getRequireText('Amount')).not().isEmpty(),
  check('location', utils.getRequireText('Location')).not().isEmpty(),
];

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
    let transaction = await Transaction.findOne({ id: req.body._id });
    if (transaction) {
      return res
        .status(400)
        .json({ errors: [{ msg: constants.serverMsg.failure.existsTrnsc }] });
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

    res.send(constants.serverMsg.success.createTrnsc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(constants.serverMsg.failure.serverError);
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res.status(400).json({ msg: constants.serverMsg.failure.noTrnsc });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(constants.serverMsg.failure.serverError);
  }
};

const UpdateTransaction = async (req, res) => {
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send(constants.serverMsg.failure.serverError);
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
    res.status(500).send(constants.serverMsg.failure.serverError);
  }
};

const getTransactionByUserId = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      user: req.params.user_id,
    }).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res
        .status(400)
        .json({ msg: constants.serverMsg.failure.noFoundTrnsc });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: constants.serverMsg.failure.noFoundTrnsc });
    }
    res.status(500).send(constants.serverMsg.failure.serverError);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndRemove({ _id: req._id });
    res.json({ msg: constants.serverMsg.success.deleteTrnsc });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  validationChecks,
  createTransaction,
  getUserTransactions,
  UpdateTransaction,
  getAllTransactions,
  getTransactionByUserId,
  deleteTransaction,
};
