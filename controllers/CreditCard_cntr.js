/** @format */

const { validationResult } = require('express-validator');
const User = require('../models/User');
const { serverMsg } = require('../constants/messages');
const logger = require('../utils/logger');

const creatCreditCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const newCreditCard = {
      exp_year: req.body.exp_year,
      exp_month: req.body.exp_month,
      last4Digits: req.body.last4Digits,
      card_Holder: user.first_name + user.last_name,
    };

    const creditcard = await newCreditCard.save();
    return res.json(creditcard);
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ errors: { msg: serverMsg.error.serverError } });
  }
};

module.exports = {
  creatCreditCard,
};
