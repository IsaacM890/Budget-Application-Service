/** @format */

const { check, validationResult } = require('express-validator');
const CreditCard = require('../models/CreditCard');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validationChecks = [
  check('exp_year', 'Expiration year is required').not().isEmpty(),
  check('exp_month', 'Expiration yea is required').not(),

  check('last4Digits', 'Please include 4 Digits at least ')
    .isEmpty()
    .isLength({ min: 4 }),
];

const creatcreditCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newcreditCard = {
      exp_year: req.body.exp_year,
      exp_month: req.body.exp_month,
      last4Digits: req.body.last4Digits,
      cardHolder: user.firstname + user.last_name,
    };

    const creditcard = await newcreditCard.save();
    res.json(creditcard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  validationChecks,
  creatcreditCard,
};
