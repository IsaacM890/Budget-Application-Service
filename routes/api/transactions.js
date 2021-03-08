/** @format */

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

// @route    GET api/transaction/me
// @desc     Get current user Transactions
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const transaction = await (
      await Transaction.findOne({ user: req.user.id })
    ).populate('user', ['first_name', 'last_name']);
    if (!transaction) {
      return res
        .status(400)
        .json({ msg: 'There is no transactions for this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/transaction
// @desc     Create or Update Transaction
// @access   Private

router.post(
  '/',
  [
    auth,
    [
      check('transactionType', 'TransactionType is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      transactionType,
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
    if (transactionType) transactionFields.transactionType = transactionType;
    if (date) transactionFields.date = date;
    if (currency) transactionFields.currency = currency;
    if (category) transactionFields.category = category;
    if (amount) transactionFields.transactionType = transactionType;
    if (location) transactionFields.location = location;
    if (company) transactionFields.company = company;
  }
);

module.exports = router;
