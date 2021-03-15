/** @format */

const express = require('express');
const router = express.Router();
const Transaction_Cntr = require('../../controllers/Transaction_cntr');

// @route    POST api/transactions
// @desc     Register User
// @access   Public

router.post(
  '/',
  Transaction_Cntr.validationChecks,
  Transaction_Cntr.createTransaction
);

// @route    GET api/transaction/me
// @desc     Get current user Transactions
// @access   Private

router.get('/me', Transaction_Cntr.getUserTransactions);

// @route    PUT api/transaction
// @desc     Create or Update Transaction
// @access   Private

router.put(
  '/',
  Transaction_Cntr.validationChecks,
  Transaction_Cntr.UpdateTransaction
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
