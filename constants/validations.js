/** @format */
const utils = require('../utils/index');
const { check } = require('express-validator');

const userChecks = [
  check('first_name', utils.getRequireText('First Name'))
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('last_name', utils.getRequireText('Last Name'))
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('email', utils.getValidText('Email')).isEmail(),
  check('password', utils.getLengthText('password', '6')).isLength({
    min: 6,
  }),
];

const transactionChecks = [
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

const creditCardChecks = [
  check('exp_year', 'Expiration year is required').not().isEmpty(),
  check('exp_month', 'Expiration yea is required').not(),

  check('last4Digits', 'Please include 4 Digits at least ')
    .isEmpty()
    .isLength({ min: 4 }),
];

module.exports = {
  userChecks,
  transactionChecks,
  creditCardChecks,
};
