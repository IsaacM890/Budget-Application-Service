/** @format */

const express = require('express');
const router = express.Router();
const transaction_Cntr = require('../../controllers/Transaction_cntr');
const check = require('../../constants/validations');

// @route    POST api/transactions
// @desc     Register User
// @access   Public

router.post('/', check.transactionChecks, transaction_Cntr.createTransaction);

// @route    GET api/transaction/me
// @desc     Get current user Transactions
// @access   Private

router.get('/me', transaction_Cntr.getUserTransactions);

// @route    PUT api/transaction
// @desc     Create or Update Transaction
// @access   Private

router.put('/', check.transactionChecks, transaction_Cntr.updateTransaction);

// @route    GET api/transactions
// @desc     Get all Transactions
// @access   Public

router.get('/', transaction_Cntr.getAllTransactions);

// @route    GET api/transactions/user/:user_id
// @desc     Get Transaction by user ID
// @access   Public

router.get('user/:user_id', transaction_Cntr.getTransactionByUserId);

// @route    DELETE api/transactions
// @desc     Delete Transaction , user
// @access   private

router.delete('/:id', transaction_Cntr.deleteTransaction);

module.exports = router;
