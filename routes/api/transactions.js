/** @format */

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Transaction = require('../../models/Transaction');
const Transaction_Cntr = require('../../controllers/Transaction_cntr');
const User = require('../../models/User');

// @route    GET api/transaction/me
// @desc     Get current user Transactions
// @access   Private

router.get('/me', Transaction_Cntr.getUserTransactions);

// @route    POST api/transaction
// @desc     Create or Update Transaction
// @access   Private

router.post(
  '/',
  Transaction_Cntr.validationChecks,
  Transaction_Cntr.createAndUpdateTransaction
);

// @route    GET api/transactions
// @desc     Get all Transactions
// @access   Public

router.get('/', Transaction_Cntr.getAllTransactions);

// @route    GET api/transactions/user/:user_id
// @desc     Get Transaction by user ID
// @access   Public

router.get('user/:user_id', Transaction_Cntr.getTransactionByUserId);

// @route    DELETE api/transactions
// @desc     Delete Transaction , user
// @access   private

router.delete('/', Transaction_Cntr.deleteTransaction);

module.exports = router;
