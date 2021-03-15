/** @format */

const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const helpers = require('../constants/index');

const validationChecks = [
  check('paymentType', helpers.getRequireText('payment Type')).not().isEmpty(),
  check('paymentMethod', helpers.getRequireText('payment Method'))
    .not()
    .isEmpty(),
  check('cancelled', helpers.getRequireText('Cancelled')).not().isEmpty(),
  check('time', helpers.getRequireText('Time')).not().isEmpty(),
  check('date', helpers.getRequireText('Date')).not().isEmpty(),
  check('currency', helpers.getRequireText('Currency')).not().isEmpty(),
  check('category', helpers.getRequireText('Category')).not().isEmpty(),
  check('amount', helpers.getRequireText('Amount')).not().isEmpty(),
  check('location', helpers.getRequireText('Location')).not().isEmpty(),
];

const getUserTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res.status(400).json({ msg: helpers.serverMsg.failure.noTrnsc });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(helpers.serverMsg.failure.serverError);
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
    //Create
    transaction = new Transaction(transactionFields);
    await Transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(helpers.serverMsg.failure.serverError);
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
    res.status(500).send(helpers.serverMsg.failure.serverError);
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
        .json({ msg: helpers.serverMsg.failure.noFoundTrnsc });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: helpers.serverMsg.failure.noFoundTrnsc });
    }
    res.status(500).send(helpers.serverMsg.failure.serverError);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndRemove({ _id: req._id });
    res.json({ msg: helpers.serverMsg.success.deleteTrnsc });
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
