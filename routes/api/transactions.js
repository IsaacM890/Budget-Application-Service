/** @format */

const express = require('express');
const router = express.Router();
const transaction_Cntr = require('../../controllers/Transaction_cntr');
const check = require('../../middleware/validations');

router.get('/latest', transaction_Cntr.getLatestTransactionsByLimit);

// @route    GET api/transactions
// @desc     Get all Transactions
// @access   Public

router.get('/all', transaction_Cntr.getAllTransactions);

// @route    POST api/transactions
// @desc     Create Transaction
// @access   Public

router.post('/', check.transactionChecks, transaction_Cntr.createTransaction);

// @route    PUT api/transaction
// @desc     Create or Update Transaction
// @access   Private

router.put('/:id', check.transactionChecks, transaction_Cntr.updateTransaction);

// @route    DELETE api/transactions
// @desc     Delete Transaction , user
// @access   private

router.delete('/:id', transaction_Cntr.deleteTransaction);

// @route    GET api/transactions/all
// @desc     Get  All Transactions
// @access   Public

// router.get('user/:id', transaction_Cntr.getTransactionByUserId);

// @route    GET api/transaction/me
// @desc     Get current user Transactions
// @access   Private

// router.get('/me', transaction_Cntr.getUserTransactions);

module.exports = router;
