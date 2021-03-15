/** @format */

const express = require('express');
const router = express.Router();
const express = require('express');
const creditCard_Cntr = require('../../controllers/CreditCard_cntr');
const router = express.Router();

// @route    POST api/cards
// @desc     Create credit card
// @access   Public

router.post(
  '/',
  creditCard_Cntr.validationChecks,
  creditCard_Cntr.creatcreditCard
);

module.exports = router;
