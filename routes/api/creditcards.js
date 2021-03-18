/** @format */

const express = require('express');
const router = express.Router();
const creditCard_Cntr = require('../../controllers/CreditCard_cntr');
const check = require('../../middleware/validations');

// @route    POST api/cards
// @desc     Create credit card
// @access   Public

router.post('/', check.creditCardChecks, creditCard_Cntr.creatcreditCard);

module.exports = router;
